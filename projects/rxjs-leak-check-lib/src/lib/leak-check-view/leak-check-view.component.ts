import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DetailCardViewModel } from '../detail-card/detail-card.view-model';
import { LeakCheckViewModelService } from './leak-check-view-model.service';

@Component({
    selector: 'rxjs-leak-check-lib-view',
    templateUrl: './leak-check-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [],
    providers: [
        LeakCheckViewModelService,
    ],
})
export class RxjsLeakCheckViewComponent implements OnInit {

    private readonly leakCheckViewModelService = inject(LeakCheckViewModelService);

    readonly view = this.leakCheckViewModelService.view;

    ngOnInit(): void {
    }

    trackById(_index: number, subscription: DetailCardViewModel): number {
        return subscription.source.id;
    }
}
