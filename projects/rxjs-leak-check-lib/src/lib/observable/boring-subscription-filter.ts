import { SubscriptionStacktrace } from './subscription-with-stacktrace';

const observableProfilerFunctions = [
    'ScannedActionsSubject',
];

const rxJsFunctions = [
    'Actions',
    'AnonymousSubject',
    'AuditOperator',
    'BehaviorSubject',
    'CatchOperator',
    'CombineLatestSubscriber',
    'DebounceTimeOperator',
    'DelayOperator',
    'DoOperator',
    'ExhaustMapOperator',
    'FilterOperator',
    'FilterSubscriber',
    'GroupByOperator',
    'GroupedObservable',
    'MapOperator',
    'MapSubscriber',
    'MergeMapSubscriber',
    'Observable',
    'RefCountOperator',
    'ReplaySubject',
    'SafeSubscriber',
    'Subject',
    'Subscriber',
    'SwitchMapOperator',
    'SwitchMapSubscriber',
    'TakeOperator',
    'TakeUntilOperator',
    'innerSubscribe',
    'subscribeToResult',
    'timer',
];

const angularFunctions = [
    'AsyncFilterClass',
    'AsyncPipe',
    'CdkDrag',
    'CdkDrag',
    'EventEmitter',
    'Module',
    'NgAdapterInjector',
    'NgZone',
    'NodeInjectorFactory',
    'ObservableStrategy',
    'R3Injector',
    'Store',
    'SubscribableStrategy',
    'Testability',
    'Zone',
    'ZoneDelegate',
    'expressionInputWatch',
    'listenerInterval',
];


const boringFunctions = [
    ...observableProfilerFunctions,
    ...rxJsFunctions,
    ...angularFunctions,
];


const isBoring = new RegExp(
    '^(new |)(' + boringFunctions.join('|') + ')($|\.)'
);


class BoringSubscriptionFilter {

    private isMatchAll(sub: SubscriptionStacktrace, pattern: RegExp): boolean {
        for (const frame of sub.short) {
            if (!frame.functionName)
                continue;
            if (!pattern.test(frame.functionName))
                return false;
        }
        return true;
    }

    isNotBoring = (sub: SubscriptionStacktrace): boolean =>
        !this.isMatchAll(sub, isBoring);
}


export const boringSubscriptionFilter = new BoringSubscriptionFilter();
