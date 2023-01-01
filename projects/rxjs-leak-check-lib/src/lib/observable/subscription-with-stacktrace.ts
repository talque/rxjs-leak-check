import { SubscriptionSource } from 'observable-profiler';
import * as StackTrace from 'stacktrace-js';
import * as ErrorStackParser from 'error-stack-parser';


export class SubscriptionStacktrace {

    readonly short: readonly ErrorStackParser.StackFrame[];

    constructor(
        readonly source: SubscriptionSource,
    ) {
        this.short = ErrorStackParser.parse(this.source);
    }

    private _detailed: Promise<readonly StackTrace.StackFrame[]> | undefined;

    get detailed(): Promise<readonly StackTrace.StackFrame[]> {
        if (this._detailed)
            return this._detailed;
        return this._detailed = StackTrace.fromError(this.source);
    }
}
