import { Options } from './options';
declare type EventClosure = (e: any) => void;
export declare class AudioPlayer {
    protected readonly options: Options;
    private readonly idKey;
    private isReady;
    private players;
    private current;
    protected onended(e: any): void;
    protected onfail(e: any): void;
    onmount: EventClosure;
    constructor(options: Options, idKey?: symbol | string);
    private mount;
    toggle(id: symbol): void;
    pause(): void;
    getKey(): string | symbol;
    private bind;
    private getCurrent;
    private getCurrentController;
    private isCurrent;
    private switchClasses;
}
export {};
