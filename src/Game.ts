import LemController from './LemController';
import Tickable from './Tickable';

const GAME_INTERVAL: number = 1000;

export default class Game {
  lemController: LemController;
  subscribers: Array<Tickable>;
  isRunning: boolean;

  constructor() {
    this.isRunning = false;
    this.lemController = new LemController();
    this.subscribers = [];
    this.subscribers.push(this.lemController);
  }

  start() {
    this.isRunning = true;
    this.tick();
  }

  end() {
    this.isRunning = false;
  }

  tick() {
    if (this.isRunning) {
      setTimeout(this.tick.bind(this), GAME_INTERVAL);
      this.subscribers.forEach(s => s.tick());
    }
  }
}
