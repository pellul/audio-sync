import { Source } from './types';
declare type EventClosure = (e: any) => void;
export declare class AudioSync {
    protected readonly sources: Source[];
    private readonly idKey;
    private isReady;
    private players;
    private current;
    protected onended(e: any): void;
    protected onfail(e: any): void;
    protected onmount: EventClosure;
    constructor(sources: Source[], idKey?: symbol);
    private mount;
    toggle(id: symbol): void;
    pause(): void;
    getKey(): symbol;
    private bind;
    private getCurrent;
    private getCurrentController;
    private isCurrent;
    private switchClasses;
}
export {};
