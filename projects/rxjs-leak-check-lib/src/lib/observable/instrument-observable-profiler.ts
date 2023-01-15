import { getSubscribers, setup } from 'observable-profiler';
import { Observable } from 'rxjs';
import { getSubscriptions } from './get-subscriptions';
import { startSubscriptionTracking } from './start-subscription-tracking';


export function instrumentObservableProfiler() {
    setup(Observable);
    startSubscriptionTracking();
    (window as any).subscriptions = commandLineAccessor();
}


function commandLineAccessor() {
    const cli: any = {};
    Object.defineProperty(cli, 'src', { get: getSubscribers });
    Object.defineProperty(cli, 'all', { get: getSubscriptions });
    return cli;
}
