import { Options } from './options';
declare type EventClosure = (e: any) => void;
export declare class AudioPlayer {
    protected readonly options: Options;
    private readonly idKey;
    private isReady;
    /**
     * The underlying elements
     */
    private players;
    /**
     * The currently played source index
     */
    private current;
    onmounted: EventClosure;
    onended: EventClosure;
    on: (eventName: string, callback: EventClosure) => void;
    constructor(options: Options, idKey?: symbol | string);
    private mount;
    toggle(id: symbol): void;
    private bind;
    private getCurrent;
    private isCurrent;
}
export {};
