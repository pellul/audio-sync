import { Source } from './types';
import manager from './player-manager';

type EventClosure = (e: any) => void;

export class AudioSync {
  private isReady: boolean = false;
  /**
   * The underlying elements
   */
  private players: Set<[HTMLAudioElement, HTMLElement]>;

  /**
   * The currently played source index
   */
  private current: symbol;

  protected onended(e: any) {
    this.players.forEach(([player]) => player.currentTime = 0);
    this.switchClasses(this.getCurrentController(), 'playing', 'paused');
    this.current = null;
    manager.hasStopped(this);
  }

  protected onfail(e: any) {
    this.players.forEach(([player, controller]) => {
      this.switchClasses(controller, 'loading', 'failed');
    })
    manager.hasFailed(this);
  }

  protected onmount: EventClosure = (e: any) => {};

  constructor(
    protected readonly sources: Source[],
    private readonly idKey: symbol = Symbol()
  ) {
    this.mount(this.sources)
    manager.add(this);
  }

  private mount(sources: Source[]): void {
    this.isReady = false;
    this.players = new Set();
    const promises = [];
    sources.forEach(([source, HTMLElement]) => {
      const player = new Audio(source);
      player[this.idKey] = Symbol();

      const element = typeof HTMLElement === 'string'
        ? document.getElementById(HTMLElement)
        : HTMLElement;

      this.players.add([player, element]);

      promises.push(new Promise((resolve, reject) => {
        this.switchClasses(element, null, 'loading');
        player.load();
        player.onerror = (e) => reject(e);
        player.oncanplaythrough = () => resolve([player, element]);
      }));
    });

    Promise.all(promises)
      .then((e: [HTMLAudioElement, HTMLElement][]) => {
        e.forEach(([player, controller]) => this.bind(player, controller));
        this.isReady = true;
        this.onmount(e)
      })
      .catch(e => this.onfail(e));
  }

  public toggle(id: symbol) {
    if (this.isReady) {
      const current = this.getCurrent();
      const currentTime = current ? current.currentTime : 0;
      this.players.forEach(([player]) => {
        if (player[this.idKey] === id) {
          if (this.isCurrent(player)) {
            player.pause();
            this.current = null;
          } else {
            player.currentTime = currentTime;
            player.play();
            this.current = player[this.idKey];
          }
        } else {
          player.pause();
        }
      });

      if (this.getCurrent()) {
        manager.isPlaying(this);
      }
    }
  }

  public pause() {
    if (this.isReady) {
      this.players.forEach(([player]) => player.pause());
      this.current = null;
    }
  }

  public getKey() {
    return this.idKey;
  }

  /**
   * Bind each player with its HTML element.
   *
   * @param player
   * @param controller
   */
  private bind(player: HTMLAudioElement, controller: HTMLElement) {
    controller[this.idKey] = player[this.idKey];
    controller.onclick = () => this.toggle(controller[this.idKey]);
    player.onpause = () => this.switchClasses(controller, 'playing', 'paused');
    player.onplay = () => this.switchClasses(controller, 'paused', 'playing');
    player.onended = (e) => this.onended(e);
    this.switchClasses(controller, 'loading', 'paused');
  }

  private getCurrent(): HTMLAudioElement {
    for (const [player] of this.players.keys()) {
      if (player[this.idKey] === this.current) {
        return player;
      }
    }
  }

  private getCurrentController(): HTMLElement {
    for (const [player, element] of this.players.keys()) {
      if (player[this.idKey] === this.current) {
        return element;
      }
    }
  }

  private isCurrent(player: HTMLAudioElement) {
    return player[this.idKey] === this.current;
  }

  private switchClasses(
    element: HTMLElement,
    from: string|string[],
    to: string,
  ) {
    const classes = element.className.split(' ')
      .reduce((acc, item) => {
        if (from instanceof Array) {
          if (from.includes(item)) {
            return acc;
           } else {
            acc.push(item);
            return acc;
           }
        } else {
          if (item === from) {
            return acc;
          } else {
            acc.push(item);
            return acc;
          }
        }
      }, []);
    classes.push(to);
    element.className = classes.join(' ').trim();
  }
}
