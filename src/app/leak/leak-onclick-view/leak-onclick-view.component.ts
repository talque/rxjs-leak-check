import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-leak-onclick-view',
    templateUrl: './leak-onclick-view.component.html',
    styleUrls: ['./leak-onclick-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeakOnclickViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
