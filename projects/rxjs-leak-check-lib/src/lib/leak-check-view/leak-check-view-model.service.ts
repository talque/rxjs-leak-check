import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { tap, map, startWith, throttleTime } from 'rxjs/operators';
import { getNewSubscriptions } from '../observable/get-subscriptions';
import { StackTraceLoaderService } from '../util/stack-trace-loader.service';
import { LeakCheckViewStoreService } from './leak-check-view-store.service';
import { LeakCheckViewModel, makeLeakCheckViewModel } from './leak-check.view-model';


@Injectable(/* local */)
export class LeakCheckViewModelService {

    private readonly leakCheckViewStoreService = inject(LeakCheckViewStoreService);
    private readonly stackTraceLoaderService = inject(StackTraceLoaderService);

    private hideSubject = new Subject<void>();

    /**
     * Hide currently-shown subscriptions, and only show new ones
     */
    hideSubscriptions(): void {
        this.hideSubject.next();
    }

    private readonly subscriptions = this.hideSubject.pipe(
        startWith(undefined),
        map(() => getNewSubscriptions()),
        // tap((subscriptions) => this.stackTraceLoaderService.load(subscriptions)),
    );

    private readonly throttledTracebacks = this.stackTraceLoaderService.traceback.pipe(
        throttleTime(500, undefined, { leading: true, trailing: true }),
    );

    readonly view: Observable<LeakCheckViewModel> = combineLatest(
        this.subscriptions,
        this.throttledTracebacks,
        this.leakCheckViewStoreService.state,
    ).pipe(
        map(([subscriptions, traceback, state]) =>
            makeLeakCheckViewModel(subscriptions, traceback, state)),
    );
}
