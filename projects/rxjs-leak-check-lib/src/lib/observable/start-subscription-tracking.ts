import { getSubscribers, printSubscribers, track } from 'observable-profiler';


export function startSubscriptionTracking() {
    track();
    (window as any).getSubscribers = getSubscribers;
    (window as any).stopProfiler = () => {
        const subscribers = track(false);
        printSubscribers({ subscribers });
    };
}
