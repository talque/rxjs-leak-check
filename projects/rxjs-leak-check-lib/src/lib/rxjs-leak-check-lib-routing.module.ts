import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsLeakCheckViewComponent } from './leak-check-view/leak-check-view.component';
import { RxjsLeakCheckLibModule } from './rxjs-leak-check-lib.module';


const routes: Routes = [
    {
        path: '',
        component: RxjsLeakCheckViewComponent,
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RxjsLeakCheckLibModule,
    ],
})
export class RxjsLeakCheckLibRoutingModule {
}
