import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import MarkdownIt from 'markdown-it';
import mdHighlight from 'markdown-it-highlightjs';

const markdownIt = MarkdownIt().use(mdHighlight);
// md.use();


@Component({
    selector: 'app-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'text',
    }
})
export class MarkdownComponent implements OnInit {

    md: string = '';

    @HostBinding('innerHtml')
    html: string = '';
    
    @Input('md') set nextSrc(md: string) {
        this.md = md;
        this.html = markdownIt.render(md);
    }

    constructor() { }
    
    ngOnInit(): void {
    }

}
