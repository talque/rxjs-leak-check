import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DetailCardViewModel } from '../detail-card/detail-card.view-model';
import { LeakCheckViewModel } from './leak-check.view-model';
import { LeakFilter } from '../leak-check-view/leak-filter.enum';
import { LeakCheckEventType, LeakCheckFilterEventModel, LeakCheckHideEventModel, LeakCheckPageEventModel } from './leak-check.event-model';
import { HelpCardEventModel } from '../help-card/help-card.event-model';


type EventModel =
    LeakCheckPageEventModel |
    LeakCheckFilterEventModel |
    LeakCheckHideEventModel |
    HelpCardEventModel;


@Component({
    selector: 'rxjs-leak-check-lib-leak-check',
    templateUrl: './leak-check.component.html',
    styleUrls: ['./leak-check.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeakCheckComponent implements OnInit {

    @Input() view!: LeakCheckViewModel;
    @Output() readonly action = new EventEmitter<EventModel>();

    ngOnInit() {
        if (!this.view)
            throw new Error('view missing');
    }

    trackById(_index: number, subscription: DetailCardViewModel): number {
        return subscription.source.id;
    }

    onPage(page: PageEvent) {
        this.action.next({
            eventType: LeakCheckEventType.PAGE,
            pageIndex: page.pageIndex,
            pageSize: page.pageSize,
        });
    }

    onMenuClick(leakFilter: LeakFilter) {
        this.action.next({
            eventType: LeakCheckEventType.FILTER,
            leakFilter: leakFilter,
        });
    }

    onHideClick() {
        this.action.next({
            eventType: LeakCheckEventType.HIDE,
            subscriptions: this.view.allSubscriptions,
        });        
    }
}
