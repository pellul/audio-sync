import { AudioSync } from './audio-sync';
declare class PlayerManager {
    private static instance;
    private onAir;
    private players;
    private constructor();
    static getInstance(): PlayerManager;
    add(player: AudioSync): void;
    isPlaying(player: AudioSync): void;
    hasStopped(player: AudioSync): void;
    hasFailed(player: AudioSync): void;
}
declare const _default: PlayerManager;
export default _default;
