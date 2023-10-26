import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
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
export class MarkdownComponent {

    md: string = '';

    @HostBinding('innerHtml')
        html: string = '';
    
    /* eslint-disable-next-line @angular-eslint/no-input-rename */
    @Input('md') set nextMd(md: string) {
        this.md = md;
        this.html = markdownIt.render(md);
    }
}
