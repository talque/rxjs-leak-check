import { Injectable } from "@angular/core";
import * as ErrorStackParser from 'error-stack-parser';
import { SubscriptionSource } from "observable-profiler";
import { BehaviorSubject, timer } from "rxjs";
import * as StackTraceGPS from 'stacktrace-gps';


type TracebackMap = WeakMap<SubscriptionSource, readonly ErrorStackParser.StackFrame[]>;


/**
 * Asynchronously load source maps and produce better stack frames
 */
@Injectable({ providedIn: 'root' })
export class StackTraceLoaderService {

    constructor() {
        (window as any).stl = this;
    }

    private queue = new Set<SubscriptionSource>();

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
        this.queue.clear();
        for (const subscription of subscriptions)
            if (!this.map.has(subscription))
                this.queue.add(subscription);
        this.maybeStartTask();
    }

    private queuePop(): SubscriptionSource | undefined {
        for (const task of this.queue) {
            this.queue.delete(task)
            return task
        }
        return undefined;
    }

    private maybeStartTask() {
        if (this.currentTask)
            return;
        const task = this.queuePop();
        if (task)
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
        await timer(100).toPromise();
        this.currentTask = undefined
        this.maybeStartTask();
    }
}
