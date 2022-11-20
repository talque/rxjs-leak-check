import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const homeMarkdown = `
# Home
`;


@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit {

    readonly homeMarkdown = homeMarkdown;
    
    constructor() { }
    
    ngOnInit(): void {
    }

}
