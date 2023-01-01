import { NgModule } from '@angular/core';
import { RxjsLeakCheckViewComponent } from './leak-check-view/leak-check-view.component';
import { DetailCardComponent } from './detail-card/detail-card.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [
        RxjsLeakCheckViewComponent,
        DetailCardComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
    ],
    exports: [
        RxjsLeakCheckViewComponent
    ]
})
export class RxjsLeakCheckLibModule { }
