import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap, throttleTime } from 'rxjs/operators';
import { LeakCheckViewModel, makeLeakCheckViewModel } from '../leak-check/leak-check.view-model';
import { getSubscriptions } from '../observable/get-subscriptions';
import { StackTraceLoaderService } from '../util/stack-trace-loader.service';
import { LeakCheckPersistentStoreService } from './leak-check-persistent-store.service';
import { LeakCheckViewStoreService } from './leak-check-view-store.service';
import { LeakCheckSubscriptionListService } from '../observable/leak-check-subscription-list.service';


@Injectable(/* local */)
export class LeakCheckViewModelService {

    private readonly leakCheckSubscriptionListService = inject(LeakCheckSubscriptionListService);
    private readonly leakCheckViewStoreService = inject(LeakCheckViewStoreService);
    private readonly leakCheckPersistentStoreService = inject(LeakCheckPersistentStoreService);
    private readonly stackTraceLoaderService = inject(StackTraceLoaderService);

    /**
     * The list of subscriptions when the component was created
     */
    private readonly subscriptions = of(
        this.leakCheckSubscriptionListService.subscriptions()
    ).pipe(
        tap((subscriptions) => this.stackTraceLoaderService.load(subscriptions)),
    );

    private readonly throttledTracebacks = this.stackTraceLoaderService.traceback.pipe(
        throttleTime(500, undefined, { leading: true, trailing: true }),
    );

    readonly view: Observable<LeakCheckViewModel> = combineLatest([
        this.subscriptions,
        this.throttledTracebacks,
        this.leakCheckViewStoreService.state,
        this.leakCheckPersistentStoreService.state,
    ]).pipe(
        map(([subscriptions, traceback, viewState, persistentState]) =>
            makeLeakCheckViewModel(subscriptions, traceback, viewState, persistentState)),
    );
}
