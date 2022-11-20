import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


const leakOnClickMarkdown = `
# OnClick
`;


@Component({
    selector: 'app-leak-onclick-view',
    templateUrl: './leak-onclick-view.component.html',
    styleUrls: ['./leak-onclick-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex flex-col p-8',
    }
})
export class LeakOnclickViewComponent implements OnInit {

  constructor() { }

    readonly leakOnClickMarkdown = leakOnClickMarkdown;
    
  ngOnInit(): void {
  }

}
