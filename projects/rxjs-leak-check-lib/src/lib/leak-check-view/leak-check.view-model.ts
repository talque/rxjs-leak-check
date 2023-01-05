import { SubscriptionSource } from 'observable-profiler';
import { DetailCardViewModel, makeDetailCardViewModel } from '../detail-card/detail-card.view-model';
import { UnreachableCaseError } from '../util/unreachable-case-error';
import { LeakCheckState } from './leak-check.state';
import { LeakFilter } from './leak-filter.enum';
import * as StackTrace from 'stacktrace-js';
import * as ErrorStackParser from 'error-stack-parser';
import { SubscriptionFilter } from './subscription-filter';


export interface LeakCheckViewModel {
    readonly menu: {
        readonly label: string;
        readonly selected: LeakFilter,
        readonly options: ReadonlyArray<{
            readonly label: string;
            readonly value: LeakFilter,
        }>;
    };
    readonly page: {
        readonly index: number;
        readonly length: number;
        readonly pageSize: number;
    }
    readonly subscriptions: readonly DetailCardViewModel[];
    readonly progressPercent: number | undefined;
}


export function makeLeakCheckViewModel(
    subscriptions: readonly SubscriptionSource[],
    tracebackMap: WeakMap<SubscriptionSource, readonly ErrorStackParser.StackFrame[]>,
    state: LeakCheckState,
): LeakCheckViewModel {
    const startIndex = state.pageIndex * state.pageSize;
    const subscriptionFilter = new SubscriptionFilter(state.filter, subscriptions, tracebackMap);
    const filteredSubscriptions = subscriptions.filter(subscriptionFilter.filter);
    return {
        menu: {
            label: leakFilterLabel(state.filter),
            selected: state.filter,
            options: leakFilterMenu.map((value) => ({
                label: leakFilterLabel(value),
                value: value,
            })),
        },
        page: {
            index: state.pageIndex,
            length: filteredSubscriptions.length,
            pageSize: state.pageSize,
        },
        subscriptions: filteredSubscriptions
            .slice(startIndex, startIndex + state.pageSize)
            .map((source, index) => makeDetailCardViewModel(
                source,
                getStackFrames(source, tracebackMap),
                startIndex + index)),
        progressPercent: progressPercent(subscriptions, tracebackMap),
    };
}


/**
 * Get the enhanced traceback or the raw stackframes 
 */
function getStackFrames(
    subscription: SubscriptionSource,
    tracebackMap: WeakMap<SubscriptionSource, readonly ErrorStackParser.StackFrame[]>,
): readonly ErrorStackParser.StackFrame[] {
    const traceback = tracebackMap.get(subscription);
    if (traceback) return traceback;
    return ErrorStackParser.parse(subscription)
}


const leakFilterMenu = [
    LeakFilter.INTERESTING,
    LeakFilter.OUTER,
    LeakFilter.ALL,
];


function leakFilterLabel(leakFilter: LeakFilter): string {
    switch (leakFilter) {
        case LeakFilter.ALL:
            return 'All subscriptions';
        case LeakFilter.OUTER:
            return 'Outer subscriptions';
        case LeakFilter.INTERESTING:
            return 'Interesting subscriptions';
        default:
            throw new UnreachableCaseError(leakFilter);
    }
}


/**
 * Return for how many subscriptions we already have the traceback
 */
function progressPercent(
    subscriptions: readonly SubscriptionSource[],
    traceback: WeakMap<SubscriptionSource, readonly ErrorStackParser.StackFrame[]>,
): number | undefined {
    let loaded = 0;
    for (const subscription of subscriptions)
        if (traceback.has(subscription))
            loaded ++;
    if (loaded === subscriptions.length)
        return undefined; // done
    return (loaded / subscriptions.length) * 100; 
}
