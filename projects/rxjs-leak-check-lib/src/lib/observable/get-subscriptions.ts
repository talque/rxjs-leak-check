import { getSubscribers, SubscriptionSource } from 'observable-profiler';


/**
 * Return all subscriptions
 */
export function getSubscriptions(): readonly SubscriptionSource[] {
    const subscriptions = getSubscribers().current();
    return subscriptions;
}
