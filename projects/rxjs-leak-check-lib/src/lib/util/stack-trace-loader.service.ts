import { Injectable } from "@angular/core";
import { SubscriptionSource } from "observable-profiler";
import { BehaviorSubject, Subject } from "rxjs";
import * as StackTrace from 'stacktrace-js';


type TracebackMap = WeakMap<SubscriptionSource, readonly StackTrace.StackFrame[]>;


/**
 * Asynchronously load source maps and produce better stack frames
 */
@Injectable({ providedIn: 'root' })
export class StackTraceLoaderService {

    private queue: readonly SubscriptionSource[] = [];

    private readonly map = new WeakMap<SubscriptionSource, readonly StackTrace.StackFrame[]>();

    private readonly tracebackSubject = new BehaviorSubject<TracebackMap>(this.map);

    /**
     * Emit an updated mapping to stackframes whenever we load more source maps
     */
    readonly traceback = this.tracebackSubject.asObservable();


    // return this._detailed = StackTrace.fromError(this.source);

    private currentTask: undefined | Promise<void>;

    /**
     * Start loading the source maps and produce detailed stack traces
     */
    load(subscriptions: readonly SubscriptionSource[]): void {
        this.queue = [
            ...this.queue,
            ...subscriptions,
        ];
        this.maybeStartTask();
    }

    private maybeStartTask() {
        if (this.currentTask || this.queue.length === 0)
            return;
        const task = this.queue[0];
        this.queue = this.queue.slice(1);
        this.currentTask = this.loadOne(task);
    }

    private async loadOne(subscription: SubscriptionSource): Promise<void> {
        const traceback = await StackTrace.fromError(subscription);
        this.map.set(subscription, traceback);
        this.tracebackSubject.next(this.map);
        console.log('Completed traceback:', traceback);
        this.currentTask = undefined
        this.maybeStartTask();
    }
}
