import { inject, Injectable } from '@angular/core';
import * as ErrorStackParser from 'error-stack-parser';
import { StackFrame } from 'error-stack-parser';
import { SubscriptionSource } from 'observable-profiler';
import { BehaviorSubject } from 'rxjs';
import { StackFrameLoaderService } from './stack-frame-loader.service';


type TracebackMap = WeakMap<SubscriptionSource, readonly StackFrame[]>;


/**
 * Asynchronously load source maps and produce better stack traces
 */
@Injectable({ providedIn: 'root' })
export class StackTraceLoaderService {

    private readonly stackFrameLoaderService = inject(StackFrameLoaderService);

    private queue = new Set<SubscriptionSource>();

    private readonly map = new WeakMap<SubscriptionSource, readonly StackFrame[]>();

    private readonly tracebackSubject = new BehaviorSubject<TracebackMap>(this.map);

    /**
     * Emit an updated mapping to stackframes whenever we load more source maps
     */
    readonly traceback = this.tracebackSubject.asObservable();

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

    private async loadOne(subscription: SubscriptionSource): Promise<void> {
        const stackframes = ErrorStackParser.parse(subscription);
        const traceback = await Promise.all(
            stackframes.map((sf) => this.stackFrameLoaderService.load(sf)));
        this.map.set(subscription, traceback);
        this.tracebackSubject.next(this.map);
        // console.log('Completed traceback:', traceback);
        this.currentTask = undefined
        this.maybeStartTask();
    }
}
