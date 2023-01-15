import { inject, Injectable } from '@angular/core';
import { HelpCardEventModel, HelpCardEventType } from '../help-card/help-card.event-model';
import { LeakCheckEventType, LeakCheckFilterEventModel, LeakCheckHideEventModel, LeakCheckPageEventModel } from '../leak-check/leak-check.event-model';
import { UnreachableCaseError } from '../util/unreachable-case-error';
import { LeakCheckPersistentStoreService } from './leak-check-persistent-store.service';
import { LeakCheckViewStoreService } from './leak-check-view-store.service';


type EventModel =
    LeakCheckPageEventModel |
    LeakCheckFilterEventModel |
    LeakCheckHideEventModel |
    HelpCardEventModel;


@Injectable(/* local */)
export class LeakCheckViewActionService {

    private readonly leakCheckViewStoreService = inject(LeakCheckViewStoreService);
    private readonly leakCheckPersistentStoreService = inject(LeakCheckPersistentStoreService);
    
    handle(event: EventModel) {
        switch (event.eventType) {
            case LeakCheckEventType.PAGE:
            case LeakCheckEventType.FILTER:
                return this.leakCheckViewStoreService.handle(event);
            case LeakCheckEventType.HIDE:
            case HelpCardEventType.HIDE:
                return this.leakCheckPersistentStoreService.handle(event);
            default:
                throw new UnreachableCaseError(event);
        }
    }
    
    
}
