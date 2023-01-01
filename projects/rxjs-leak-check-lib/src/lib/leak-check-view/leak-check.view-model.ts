import { DetailCardViewModel } from '../detail-card/detail-card.view-model';



export interface LeakCheckViewModel {
    readonly subscriptions: readonly DetailCardViewModel[];
}
