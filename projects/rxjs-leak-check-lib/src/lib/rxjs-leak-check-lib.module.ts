import { NgModule } from '@angular/core';
import { RxjsLeakCheckViewComponent } from './leak-check-view/leak-check-view.component';
import { DetailCardComponent } from './detail-card/detail-card.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HelpCardComponent } from './help-card/help-card.component';
import { LeakCheckComponent } from './leak-check/leak-check.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    declarations: [
        RxjsLeakCheckViewComponent,
        DetailCardComponent,
        HelpCardComponent,
        LeakCheckComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        RxjsLeakCheckViewComponent
    ]
})
export class RxjsLeakCheckLibModule { }
