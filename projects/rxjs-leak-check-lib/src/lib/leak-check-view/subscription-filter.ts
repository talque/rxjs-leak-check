import { SubscriptionSource } from 'observable-profiler';
import { LeakFilter } from './leak-filter.enum';
import * as ErrorStackParser from 'error-stack-parser';
import { UnreachableCaseError } from '../util/unreachable-case-error';


type FilterFunc = (subscription: SubscriptionSource) => boolean;


export class SubscriptionFilter {

    constructor(
        private readonly leakFilter: LeakFilter,
        private readonly subscriptions: readonly SubscriptionSource[],
        private readonly tracebackMap: WeakMap<SubscriptionSource, readonly ErrorStackParser.StackFrame[]>,
    ) { }

    get filter(): FilterFunc {
        switch (this.leakFilter) {
            case LeakFilter.ALL:
                return this.filterAll.bind(this);
            case LeakFilter.OUTER:
                return this.filterOuter.bind(this);
            case LeakFilter.INTERESTING:
                return this.filterInteresting.bind(this);
            default:
                throw new UnreachableCaseError(this.leakFilter);
        }
    }

    /**
     * trivial filter that includes all
     */
    private filterAll(subscription: SubscriptionSource): boolean {
        return true;
    }

    /**
     * filter that only includes outer subscriptions
     */
    private filterOuter(subscription: SubscriptionSource): boolean {
        return this.outer().has(subscription);
    }

    /**
     * filter for the "interesting" subscriptions
     */
    private filterInteresting(subscription: SubscriptionSource): boolean {
        const traceback = this.tracebackMap.get(subscription);
        if (!traceback)
            return false; // loading...
        for (const stackFrame of traceback)
            if (this.isInterestingStackFrame(stackFrame))
                return true;
        return false;
    }

    private isInterestingStackFrame(stackFrame: ErrorStackParser.StackFrame): boolean {
        if (!(stackFrame.fileName))
            return true;
        if (stackFrame.fileName.startsWith('webpack:///projects/rxjs-leak-check-lib'))
            return false;
        if (stackFrame.fileName.startsWith('webpack:///node_modules'))
            return false;
        return true;
    }

    private _outerCache: Set<SubscriptionSource> | undefined;

    private outer(): Set<SubscriptionSource> {
        if (this._outerCache)
            return this._outerCache;
        const outer = new Set<SubscriptionSource>();
        const seen = new Set<number>();
        for (const val of this.subscriptions) {
            if (seen.has(val.id))
                continue;
            outer.add(val);
            seen.add(val.id);
        }
        return this._outerCache = outer;
    }
}

