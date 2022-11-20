import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownComponent implements OnInit {

    @Input() md: string = '';
    
    constructor() { }
    
    ngOnInit(): void {
    }

}
