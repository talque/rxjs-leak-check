import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeakCheckEventType, LeakCheckFilterEventModel, LeakCheckPageEventModel } from '../leak-check/leak-check.event-model';
import { UnreachableCaseError } from '../util/unreachable-case-error';
import { initialLeakCheckViewState, LeakCheckViewState } from './leak-check-view.state';
import { LeakFilter } from './leak-filter.enum';


@Injectable(/* local */)
export class LeakCheckViewStoreService {

    private readonly subject = new BehaviorSubject<LeakCheckViewState>(initialLeakCheckViewState);

    readonly state = this.subject.asObservable();

    private setPage(pageIndex: number, pageSize: number) {
        const state: LeakCheckViewState = {
            ...this.subject.value,
            pageIndex: pageIndex,
            pageSize: pageSize,
        };
        this.subject.next(state);
    }

    private setLeakFilter(leakFilter: LeakFilter) {
        const state: LeakCheckViewState = {
            ...this.subject.value,
            filter: leakFilter,
        };
        this.subject.next(state);
    }

    handle(event: LeakCheckPageEventModel | LeakCheckFilterEventModel) {
        switch (event.eventType) {
            case LeakCheckEventType.PAGE:
                return this.setPage(event.pageIndex, event.pageSize);
            case LeakCheckEventType.FILTER:
                return this.setLeakFilter(event.leakFilter);
            default:
                throw new UnreachableCaseError(event);
        }
    }
}
