import { SubscriptionSource } from 'observable-profiler';


/**
 * Internal state of the leak check component that is persistent for the app lifetime
 */
export interface LeakCheckPersistentState {
    readonly hidden: ReadonlySet<SubscriptionSource>;
    readonly help: boolean;
};


export const initialLeakCheckPersistentState: LeakCheckPersistentState = {
    hidden: new Set(),
    help: true,
}
