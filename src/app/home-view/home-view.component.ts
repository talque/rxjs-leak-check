import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


const homeMarkdown = `
# RxJS Leak Check

This is a tool that helps you identify subscription leaks in your
program. This website is both the source code, documentation, and an
interactive demo.
`;


@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex flex-col p-8',
    }
})
export class HomeViewComponent implements OnInit {

    readonly homeMarkdown = homeMarkdown;
    
    constructor() { }
    
    ngOnInit(): void {
    }

}
