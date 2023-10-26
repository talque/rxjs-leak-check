import { Injectable } from '@angular/core';
import { getSubscriptions } from './get-subscriptions';


@Injectable({ providedIn: 'root' })
export class LeakCheckSubscriptionListService {

    subscriptions() {
        return getSubscriptions();
    }
}
