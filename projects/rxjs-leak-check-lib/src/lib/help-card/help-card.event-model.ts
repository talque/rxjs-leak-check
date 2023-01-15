
export enum HelpCardEventType {
    HIDE = 'HelpCardEventType.HIDE',
}


export interface HelpCardEventModel {
    readonly eventType: HelpCardEventType.HIDE;
}
