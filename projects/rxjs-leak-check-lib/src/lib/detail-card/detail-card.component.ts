import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DetailCardViewModel } from './detail-card.view-model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'rxjs-leak-check-lib-detail-card',
    templateUrl: './detail-card.component.html',
    styleUrls: ['./detail-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex flex-none flex-col mx-5 mt-5 cursor-pointer',
    }
})
export class DetailCardComponent {

    @Input() view!: DetailCardViewModel;

    constructor(
        private readonly matSnackBar: MatSnackBar,
    ) { }
    
    ngOnInit() {
        if (!this.view)
            throw new Error('input missing');
    }

    onPrint() {
        console.error(this.view.source);
        this.matSnackBar.open(
            'Stack trace printed to Javascript console',
            undefined,
            { duration: 5000 },
        );
    }
}

