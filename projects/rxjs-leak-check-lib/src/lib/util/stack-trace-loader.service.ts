import { Injectable } from "@angular/core";
import * as ErrorStackParser from 'error-stack-parser';
import { SubscriptionSource } from "observable-profiler";
import { BehaviorSubject } from "rxjs";
import * as StackTraceGPS from 'stacktrace-gps';


type TracebackMap = WeakMap<SubscriptionSource, readonly ErrorStackParser.StackFrame[]>;


/**
 * Asynchronously load source maps and produce better stack frames
 */
@Injectable({ providedIn: 'root' })
export class StackTraceLoaderService {

    private queue: readonly SubscriptionSource[] = [];

    private readonly map = new WeakMap<SubscriptionSource, readonly ErrorStackParser.StackFrame[]>();

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

    // keep the instance cached, otherwise source maps are loaded multiple times
    private readonly gps = new StackTraceGPS();

    private async loadOne(subscription: SubscriptionSource): Promise<void> {
        const stackframes = ErrorStackParser.parse(subscription);
        const traceback = await Promise.all(
            stackframes.map((sf) => this.gps.getMappedLocation(sf)));
        this.map.set(subscription, traceback);
        this.tracebackSubject.next(this.map);
        console.log('Completed traceback:', traceback);
        this.currentTask = undefined
        this.maybeStartTask();
    }
}
