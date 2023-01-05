import ErrorStackParser from 'error-stack-parser';
import { SubscriptionSource } from 'observable-profiler';


export interface DetailCardViewModel {
    readonly source: SubscriptionSource;
    readonly index: number;
    readonly stackFrames: readonly ErrorStackParser.StackFrame[];
};


export function makeDetailCardViewModel(
    source: SubscriptionSource,
    stackFrames: readonly ErrorStackParser.StackFrame[],
    index: number,
): DetailCardViewModel {
    return {
        source: source,
        index: index,
        stackFrames: stackFrames,
    }
}
