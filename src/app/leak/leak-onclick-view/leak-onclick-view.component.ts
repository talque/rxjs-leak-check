import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';


const leakOnClickMarkdown = `
# Leak OnClick


Never subscribe to observables in a component after the \`OnInit\`
hook, that is, after \`ngOnInit()\` returns. The main issue here is a
philosophical one, you should use rxjs to declaratively write down the
business logic in your component so it is contained in one place. If
you do not subscribe at the start then you are mixing imperative
code (this method calls that method) with an rxjs pipe.

Besides this stylistic point, there are also very real sources for
bugs that you expose yourself to. For example, it becomes easy to miss
events emitted because you haven't subscribed yet. This potential
issue is called a "late subscriber" in rxjs. And, on the topic of rxjs
memory leaks, you can forget to unsubscribe to all the subscriptions
that you end up creating. This can happen either because there is no
corresponding unsubcribe, or because the late subscription happens
    after the component is destroyed.

Here is a simple example, clicking the button calls
\`\`\`ts
    onClick(): void {
        longLivedObservable.subscribe();
    }
\`\`\`
which creates a new subscription that runs forever, since the
\`longLivedObservable\` just does not complete during the runtime of the
browser session.
`;


const longLivedObservable = new Subject<void>();


@Component({
    selector: 'app-leak-onclick-view',
    templateUrl: './leak-onclick-view.component.html',
    styleUrls: ['./leak-onclick-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex flex-col p-8',
    }
})
export class LeakOnclickViewComponent {

    readonly leakOnClickMarkdown = leakOnClickMarkdown;

    onClick(): void {
        longLivedObservable.subscribe({
            next: (value) => console.log('next value:', value),
            error: (error) => console.error('error:', error),
            complete: () => console.log('subscription completed'),
        });
    }
}
