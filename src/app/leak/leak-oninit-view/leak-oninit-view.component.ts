import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';


const leakOnInitMarkdown = `
# OnInit
`;


const longLivedObservable = new Subject<void>();


@Component({
    selector: 'app-leak-oninit-view',
    templateUrl: './leak-oninit-view.component.html',
    styleUrls: ['./leak-oninit-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex flex-col p-8',
    }
})
export class LeakOninitViewComponent implements OnInit {
    
    constructor() { }

    readonly leakOnInitMarkdown = leakOnInitMarkdown;

    ngOnInit(): void {
        longLivedObservable.subscribe({
            next: (value) => console.log('next value:', value),
            error: (error) => console.error('error:', error),
            complete: () => console.log('subscription completed'),
        });
    }

}
