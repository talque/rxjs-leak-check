import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


const homeMarkdown = `
# Home

The quick brown fox jumps over the lazy dog

\`\`\`js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

and
\`\`\`ts
var foo = function (bar: number) {
  return bar++;
};

console.log(foo(5));
\`\`\`

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
