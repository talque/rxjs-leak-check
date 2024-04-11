import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DetailCardViewModel } from '../detail-card/detail-card.view-model';
import { LeakCheckViewActionService } from './leak-check-view-action.service';
import { LeakCheckViewModelService } from './leak-check-view-model.service';
import { LeakCheckViewStoreService } from './leak-check-view-store.service';


type EventModel = Parameters<LeakCheckViewActionService['handle']>[0];


@Component({
    selector: 'rxjs-leak-check-lib-view',
    templateUrl: './leak-check-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./leak-check-view.component.scss'],
    providers: [
        LeakCheckViewStoreService,
        LeakCheckViewModelService,
        LeakCheckViewActionService,
    ],
})
export class RxjsLeakCheckViewComponent {

    private readonly leakCheckViewModelService = inject(LeakCheckViewModelService);
    private readonly leakCheckViewActionService = inject(LeakCheckViewActionService);

    readonly view = this.leakCheckViewModelService.view;

    onAction(event: EventModel) {
        this.leakCheckViewActionService.handle(event);
    }
}
