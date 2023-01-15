import { LeakFilter } from './leak-filter.enum';
import { pageSizeOptions } from '../leak-check/page-size-options';


/**
 * Internal state of the leak check component that is tied to the component lifetime
 */
export interface LeakCheckViewState {
    readonly filter: LeakFilter;
    readonly pageIndex: number;
    readonly pageSize: number;
};


export const initialLeakCheckViewState: LeakCheckViewState = {
    filter: LeakFilter.INTERESTING,
    pageIndex: 0,
    pageSize: pageSizeOptions[1],
}
