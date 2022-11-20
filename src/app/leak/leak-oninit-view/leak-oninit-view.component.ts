import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-leak-oninit-view',
    templateUrl: './leak-oninit-view.component.html',
    styleUrls: ['./leak-oninit-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeakOninitViewComponent implements OnInit {
    
    constructor() { }
    
    ngOnInit(): void {
    }

}
