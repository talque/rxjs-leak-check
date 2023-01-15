import { SubscriptionSource } from 'observable-profiler';
import { LeakFilter } from '../leak-check-view/leak-filter.enum';


export enum LeakCheckEventType {
    PAGE = 'LeakCheckEventType.PAGE',
    FILTER = 'LeakCheckEventType.FILTER',
    HIDE = 'LeakCheckEventType.HIDE',
}


export interface LeakCheckPageEventModel {
    readonly eventType: LeakCheckEventType.PAGE;
    readonly pageIndex: number;
    readonly pageSize: number;
}


export interface LeakCheckFilterEventModel {
    readonly eventType: LeakCheckEventType.FILTER;
    readonly leakFilter: LeakFilter;
}


export interface LeakCheckPageEventModel {
    readonly eventType: LeakCheckEventType.PAGE;
    readonly pageIndex: number;
    readonly pageSize: number;
}


export interface LeakCheckHideEventModel {
    readonly eventType: LeakCheckEventType.HIDE;
    readonly subscriptions: readonly SubscriptionSource[],
}



