import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LeakCheckEventType, LeakCheckHideEventModel } from '../leak-check/leak-check.event-model';
import { initialLeakCheckPersistentState, LeakCheckPersistentState } from './leak-check-persistent.state';
import { HelpCardEventModel, HelpCardEventType } from '../help-card/help-card.event-model';
import { UnreachableCaseError } from '../util/unreachable-case-error';
import { SubscriptionSource } from 'observable-profiler';


type EventModel =
    LeakCheckHideEventModel |
    HelpCardEventModel;


@Injectable({ providedIn: 'root' })
export class LeakCheckPersistentStoreService {

    private readonly subject = new BehaviorSubject<LeakCheckPersistentState>(initialLeakCheckPersistentState);

    readonly state = this.subject.asObservable();

    /**
     * Hide currently-shown subscriptions, and only show new ones
     */
    hideSubscriptions(subscriptions: readonly SubscriptionSource[]): void {
        this.subject.next({
            ...this.subject.value,
            hidden: new Set(subscriptions),
        });
    }

    handle(event: EventModel) {
        switch (event.eventType) {
            case LeakCheckEventType.HIDE:
                return this.hideSubscriptions(event.subscriptions);
            case HelpCardEventType.HIDE:
                return this.subject.next({
                    ...this.subject.value,
                    help: false,
                });
            default:
                throw new UnreachableCaseError(event);
        };
    }
}
