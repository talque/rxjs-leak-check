import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { makeDetailCardViewModel } from '../detail-card/detail-card.view-model';
import { getNewSubscriptions } from '../observable/get-subscriptions';
import { LeakCheckViewModel } from './leak-check.view-model';


@Injectable(/* local */)
export class LeakCheckViewModelService {

    private readonly subscriptions = of(getNewSubscriptions());

    readonly view: Observable<LeakCheckViewModel> = this.subscriptions.pipe(
        map((subscriptions) => ({
            subscriptions: subscriptions
                .slice(0, 10)
                .map((sub, index) => makeDetailCardViewModel(sub.source, index)),
        })),
    );
}
