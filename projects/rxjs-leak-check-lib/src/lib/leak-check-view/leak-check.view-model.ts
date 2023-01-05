import { SubscriptionSource } from 'observable-profiler';
import { DetailCardViewModel, makeDetailCardViewModel } from '../detail-card/detail-card.view-model';
import { UnreachableCaseError } from '../util/unreachable-case-error';
import { LeakCheckState } from './leak-check.state';
import { LeakFilter } from './leak-filter.enum';
import * as StackTrace from 'stacktrace-js';
import * as ErrorStackParser from 'error-stack-parser';


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
}


export function makeLeakCheckViewModel(
    subscriptions: readonly SubscriptionSource[],
    traceback: WeakMap<SubscriptionSource, readonly ErrorStackParser.StackFrame[]>,
    state: LeakCheckState,
): LeakCheckViewModel {
    const startIndex = state.pageIndex * state.pageSize;
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
            length: subscriptions.length,
            pageSize: state.pageSize,
        },
        subscriptions: subscriptions
            .slice(startIndex, startIndex + state.pageSize)
            .map((source, index) => makeDetailCardViewModel(
                source,
                getStackFrames(source, traceback),
                startIndex + index)),
    };
}

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
            return 'All leaks';
        case LeakFilter.OUTER:
            return 'Outer leaks';
        case LeakFilter.INTERESTING:
            return 'Interesting leaks';
        default:
            throw new UnreachableCaseError(leakFilter);
    }
}
