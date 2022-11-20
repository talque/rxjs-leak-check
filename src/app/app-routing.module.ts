import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { views } from './views';

const routes: Routes = [
    { path: views.home.path, component: views.home.component },
    { path: views.leakOnInit.path, component: views.leakOnInit.component },
    { path: views.leakOnClick.path, component: views.leakOnClick.component },
    { path: views.leakTakeUntil.path, component: views.leakTakeUntil.component },
    {
        path: '',
        redirectTo: views.home.path,
        pathMatch: 'full',
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
