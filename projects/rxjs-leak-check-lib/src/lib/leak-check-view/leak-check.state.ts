import { LeakFilter } from "./leak-filter.enum";
import { pageSizeOptions } from "./page-size-options";


/**
 * Internal state of the leak check component
 */
export interface LeakCheckState {
    readonly filter: LeakFilter;
    readonly pageIndex: number;
    readonly pageSize: number;

};


export const initialLeakCheckState: LeakCheckState = {
    filter: LeakFilter.INTERESTING,
    pageIndex: 0,
    pageSize: pageSizeOptions[1],
}
