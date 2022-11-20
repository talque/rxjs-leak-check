import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


const leakTakeUntilMarkdown = `
# takeUntil()
`;


@Component({
    selector: 'app-leak-takeuntil-view',
    templateUrl: './leak-takeuntil-view.component.html',
    styleUrls: ['./leak-takeuntil-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex flex-col p-8',
    }
})
export class LeakTakeuntilViewComponent implements OnInit {

    readonly leakTakeUntilMarkdown = leakTakeUntilMarkdown;
    
    constructor() { }

    ngOnInit(): void {
    }

}
