import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsLeakCheckViewComponent } from './leak-check-view/leak-check-view.component';


const routes: Routes = [
    {
        path: '',
        component: RxjsLeakCheckViewComponent,
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RxjsLeakCheckLibRoutingModule {
}
