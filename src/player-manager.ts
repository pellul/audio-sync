import { AudioSync } from './audio-sync';

/**
 * Singleton here to prevent several AudioSync to play at the same time
 */
class PlayerManager {
  private static instance: PlayerManager;

  private onAir: symbol | string;
  private players: Map<symbol | string, AudioSync>;

  private constructor() {
    this.players = new Map<symbol | string, AudioSync>();
  }

  static getInstance() {
    if (!PlayerManager.instance) {
      PlayerManager.instance = new PlayerManager();
    }
    return PlayerManager.instance;
  }

  // Add a AudioSync instance to the existing list
  public add(player: AudioSync) {
    this.players.set(player.getKey(), player);
  }

  public isPlaying(player: AudioSync) {
    if (!this.onAir) {
      this.onAir = player.getKey();
    } else if (this.onAir !== player.getKey()) {
      this.players.get(this.onAir).pause();
      this.onAir = player.getKey();
    }
  }

  public hasStopped(player: AudioSync) {
    if (this.onAir === player.getKey()) {
      this.onAir = null;
    }
  }

  public hasFailed(player: AudioSync) {
    //
  }
}

export default PlayerManager.getInstance();
