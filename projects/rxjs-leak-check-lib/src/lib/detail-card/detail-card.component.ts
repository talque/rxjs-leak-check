import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DetailCardViewModel } from './detail-card.view-model';

@Component({
    selector: 'rxjs-leak-check-lib-detail-card',
    templateUrl: './detail-card.component.html',
    styleUrls: ['./detail-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex flex-none flex-col mx-5 mt-5',
    }
})
export class DetailCardComponent {

    @Input() view!: DetailCardViewModel;

    ngOnInit() {
        if (!this.view)
            throw new Error('input missing');
    }

    onPrint() {
        console.error(this.view.source);
    }
}

