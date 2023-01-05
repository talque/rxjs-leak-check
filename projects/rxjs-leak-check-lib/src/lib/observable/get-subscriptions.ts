import { getSubscribers, SubscriptionSource } from 'observable-profiler';
import { boringSubscriptionFilter } from './boring-subscription-filter';
import { SubscriptionStacktrace } from './subscription-with-stacktrace';


/**
 * Return all subscriptions
 */
export function getSubscriptions() {
    const subscriptions = getSubscribers().current();
    return subscriptions;
}


/**
 * Exclude subscriptions that were made internally when subscribing
 */
export function getOuterSubscriptions() {
    const current = getSubscriptions();
    const map = new Set();
    const outer: SubscriptionSource[] = [];
    for (const val of current) {
        if (map.has(val.id))
            continue;
        outer.push(val);
        map.add(val.id);
    }
    return outer;
}


/**
 * Return the subscriptions with auxiliary (rxjs-internal) ones removed
 *
 * Note that rxjs operators create internal subscriptions,
 * e.g. switchMap() subscribes to the inner observable and emits
 * values to the outer observable. These are not particularly
 * interesting and do not constitute memory leaks, as their lifetime
 * is bound to the outer observable.
 */
export function getRootSubscriptions() {
    return getOuterSubscriptions();
}



let previous: WeakSet<SubscriptionSource> = new WeakSet();


/**
 * Return the outer subscriptions that were not preset during the last call
 */
export function getNewSubscriptions(): readonly SubscriptionSource[] {
    const all = getSubscriptions();
    const diff: SubscriptionSource[] = all.filter(
        (sub) => !previous.has(sub));
    previous = new WeakSet(all);
    return diff;
}
