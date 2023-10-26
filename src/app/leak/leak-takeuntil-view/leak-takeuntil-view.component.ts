import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, interval, switchMap, takeUntil } from 'rxjs';


const leakTakeUntilMarkdown = `
# Leak takeUntil(this.destroy)

The \`takeUntil(this.destroy)\` pattern is a good way to avoid memory leaks,
but you have to be aware of a potential pitfall: The takeUntil() has to be the
last entry of the pipe. Otherwise, depending on the following rxjs operators,
you can have a memory leak. For example, the following is a memory leak
because the switchMap will forever try to drain the inner interval observable.
\`\`\`ts
@Component({
export class MyComponent implements OnInit {

    private readonly myService = inject(MyService);

    ngOnInit(): void {
        this.myService.observable.pipe(
            takeUntil(this.destroy),
            switchMap(() => interval(1000)),     // memory leak
        ).subscribe({
            next: (value) => console.log('Next value:', value),
        });
    }
}
\`\`\`
If you flip the order of takeUntil & switchMap then the code is correct, and
the subscription is unsubscribed when the component is destroyed.
`;


const longLivedObservable = new BehaviorSubject<number>(0);


@Component({
    selector: 'app-leak-takeuntil-view',
    templateUrl: './leak-takeuntil-view.component.html',
    styleUrls: ['./leak-takeuntil-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex flex-col p-8',
    }
})
export class LeakTakeuntilViewComponent implements OnInit, OnDestroy {

    readonly leakTakeUntilMarkdown = leakTakeUntilMarkdown;

    private readonly destroy = new Subject<void>();

    ngOnInit(): void {
        longLivedObservable.pipe(
            takeUntil(this.destroy),
            switchMap(() => interval(1000)),
        ).subscribe({
            next: (value) => console.log('next value:', value),
            error: (error) => console.error('error:', error),
            complete: () => console.log('subscription completed'),
        });
    }

    ngOnDestroy() {
        this.destroy.next();
    }
}
