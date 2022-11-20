import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-leak-takeuntil-view',
    templateUrl: './leak-takeuntil-view.component.html',
    styleUrls: ['./leak-takeuntil-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeakTakeuntilViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
