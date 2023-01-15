import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { HelpCardEventModel, HelpCardEventType } from './help-card.event-model';

@Component({
    selector: 'rxjs-leak-check-lib-help-card',
    templateUrl: './help-card.component.html',
    styleUrls: ['./help-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex flex-none flex-col mx-5 mt-5',
    }
})
export class HelpCardComponent {

    @Output() readonly action = new EventEmitter<HelpCardEventModel>();

    onHideClick() {
        this.action.next({
            eventType: HelpCardEventType.HIDE,
        });
    }
}
