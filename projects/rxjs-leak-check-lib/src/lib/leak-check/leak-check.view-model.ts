import { StackFrame, parse } from 'error-stack-parser';
import { SubscriptionSource } from 'observable-profiler';
import { DetailCardViewModel, makeDetailCardViewModel } from '../detail-card/detail-card.view-model';
import { UnreachableCaseError } from '../util/unreachable-case-error';
import { LeakCheckViewState } from '../leak-check-view/leak-check-view.state';
import { LeakFilter } from '../leak-check-view/leak-filter.enum';
import { SubscriptionFilter } from '../leak-check-view/subscription-filter';
import { pageSizeOptions } from './page-size-options';
import { LeakCheckPersistentState } from '../leak-check-view/leak-check-persistent.state';


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
    },
    readonly pageSizeOptions: number[];
    readonly help: boolean;
    readonly subscriptions: readonly DetailCardViewModel[];
    readonly allSubscriptions: readonly SubscriptionSource[];
    readonly progress: undefined | {
        readonly current: number;
        readonly total: number;
        readonly percent: number;
    };
}


export function makeLeakCheckViewModel(
    subscriptions: readonly SubscriptionSource[],
    tracebackMap: WeakMap<SubscriptionSource, readonly StackFrame[]>,
    viewState: LeakCheckViewState,
    persistentState: LeakCheckPersistentState,
): LeakCheckViewModel {
    const startIndex = viewState.pageIndex * viewState.pageSize;
    const subscriptionFilter = new SubscriptionFilter(
        viewState.filter,
        subscriptions,
        persistentState.hidden,
        tracebackMap,
    );
    const filteredSubscriptions = subscriptions.filter(subscriptionFilter.filter);
    return {
        menu: {
            label: leakFilterLabel(viewState.filter),
            selected: viewState.filter,
            options: leakFilterMenu.map((value) => ({
                label: leakFilterLabel(value),
                value: value,
            })),
        },
        page: {
            index: viewState.pageIndex,
            length: filteredSubscriptions.length,
            pageSize: viewState.pageSize,
        },
        pageSizeOptions: pageSizeOptions,
        help: persistentState.help && (viewState.pageIndex === 0),
        allSubscriptions: subscriptions,
        subscriptions: filteredSubscriptions
            .slice(startIndex, startIndex + viewState.pageSize)
            .map((source, index) => makeDetailCardViewModel(
                source,
                getStackFrames(source, tracebackMap),
                startIndex + index)),
        progress: makeProgress(subscriptions, tracebackMap),
    };
}


/**
 * Get the enhanced traceback or the raw stackframes 
 */
function getStackFrames(
    subscription: SubscriptionSource,
    tracebackMap: WeakMap<SubscriptionSource, readonly StackFrame[]>,
): readonly StackFrame[] {
    const traceback = tracebackMap.get(subscription);
    if (traceback) return traceback;
    return parse(subscription)
}


const leakFilterMenu = [
    LeakFilter.INTERESTING,
    LeakFilter.OUTER,
    LeakFilter.NEW,
    LeakFilter.ALL,
];


function leakFilterLabel(leakFilter: LeakFilter): string {
    switch (leakFilter) {
        case LeakFilter.ALL:
            return 'All subscriptions';
        case LeakFilter.NEW:
            return 'New subscriptions';
        case LeakFilter.OUTER:
            return 'New outer subscriptions';
        case LeakFilter.INTERESTING:
            return 'Interesting subscriptions';
        default:
            throw new UnreachableCaseError(leakFilter);
    }
}


/**
 * Return for how many subscriptions we already have the traceback
 */
function makeProgress(
    subscriptions: readonly SubscriptionSource[],
    traceback: WeakMap<SubscriptionSource, readonly StackFrame[]>,
): LeakCheckViewModel['progress'] {
    let loaded = 0;
    for (const subscription of subscriptions)
        if (traceback.has(subscription))
            loaded ++;
    if (loaded === subscriptions.length)
        return undefined; // done
    return {
        current: loaded,
        total: subscriptions.length,
        percent: (loaded / subscriptions.length) * 100,
    };
}
