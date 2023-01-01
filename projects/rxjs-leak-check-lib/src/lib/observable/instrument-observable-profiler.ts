import { setup } from 'observable-profiler';
import { Observable } from 'rxjs';
import {
    getNewSubscriptions,
    getOuterSubscriptions,
    getRootSubscriptions,
    getSubscriptions,
} from './get-subscriptions';
import { getSubscribers } from 'observable-profiler';
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
    Object.defineProperty(cli, 'outer', { get: getOuterSubscriptions });
    Object.defineProperty(cli, 'root', { get: getRootSubscriptions });
    Object.defineProperty(cli, 'new', { get: getNewSubscriptions });
    return cli;
}
