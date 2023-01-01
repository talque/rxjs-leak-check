import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DetailCardViewModel } from '../detail-card/detail-card.view-model';
import { LeakCheckViewModelService } from './leak-check-view-model.service';
import { LeakCheckViewStoreService } from './leak-check-view-store.service';
import { LeakFilter } from './leak-filter.enum';
import { pageSizeOptions } from './page-size-options';


@Component({
    selector: 'rxjs-leak-check-lib-view',
    templateUrl: './leak-check-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [],
    providers: [
        LeakCheckViewStoreService,
        LeakCheckViewModelService,
    ],
})
export class RxjsLeakCheckViewComponent {

    private readonly leakCheckViewStoreService = inject(LeakCheckViewStoreService);
    private readonly leakCheckViewModelService = inject(LeakCheckViewModelService);

    readonly view = this.leakCheckViewModelService.view;
    readonly pageSizeOptions = pageSizeOptions;

    trackById(_index: number, subscription: DetailCardViewModel): number {
        return subscription.source.id;
    }

    onPage(page: PageEvent) {
        this.leakCheckViewStoreService.setPage(page.pageIndex, page.pageSize);
    }

    onMenuClick(leakFilter: LeakFilter) {
        this.leakCheckViewStoreService.setLeakFilter(leakFilter);
    }

    onHideClick() {
        this.leakCheckViewModelService.hideSubscriptions();
    }
}
