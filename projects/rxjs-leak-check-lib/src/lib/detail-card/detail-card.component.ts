import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DetailCardViewModel } from './detail-card.view-model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'rxjs-leak-check-lib-detail-card',
    templateUrl: './detail-card.component.html',
    styleUrls: ['./detail-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCardComponent implements OnInit {

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

