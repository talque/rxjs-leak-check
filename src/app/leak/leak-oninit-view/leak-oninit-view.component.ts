import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


const leakOnInitMarkdown = `
# Leak OnInit


Here is a very common pattern where we subscribe to an observable that
we get from an injected service, in order to be notified of updates.
\`\`\`ts
@Component({
export class MyComponent implements OnInit {

    constructor(private readonly myService: MyService) { }

    ngOnInit(): void {
        this.myService.observable.subscribe({
            next: (value) => console.log('Next value:', value),
        });
    }
}
\`\`\`

Without any further code to handle unsubscribing when the component is
destroyed, this causes a memory leak.  Whenever the component is shown
a new subscription is made. You might notice such a leak by the action
being triggered multiple times, that is, even after you created and
destroyed the component n times any new value emitted by
\`MyService.observable\` will be printed n times to the console.

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
