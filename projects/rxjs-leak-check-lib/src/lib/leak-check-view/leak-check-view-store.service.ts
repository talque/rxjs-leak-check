import { Injectable } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { BehaviorSubject } from "rxjs";
import { LeakCheckState, initialLeakCheckState } from './leak-check.state'
import { LeakFilter } from "./leak-filter.enum";


@Injectable(/* local */)
export class LeakCheckViewStoreService {

    private readonly subject = new BehaviorSubject<LeakCheckState>(initialLeakCheckState);

    readonly state = this.subject.asObservable();

    setPage(pageIndex: number, pageSize: number) {
        const state: LeakCheckState = {
            ...this.subject.value,
            pageIndex: pageIndex,
            pageSize: pageSize,
        };
        this.subject.next(state);
    }

    setLeakFilter(leakFilter: LeakFilter) {
        const state: LeakCheckState = {
            ...this.subject.value,
            filter: leakFilter,
        };
        this.subject.next(state);
    }
}
