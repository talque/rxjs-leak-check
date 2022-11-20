import { Component } from '@angular/core';
import { menu } from './views';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    host: {
        class: 'flex flex-col flex-1 min-h-0',
    },
})
export class AppComponent {
    readonly title = 'rxjs-leak-check';

    readonly menu = menu;
}
