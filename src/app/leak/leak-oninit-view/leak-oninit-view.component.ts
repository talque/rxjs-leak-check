import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


const leakOnInitMarkdown = `
# OnInit
`;


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
    }

}
