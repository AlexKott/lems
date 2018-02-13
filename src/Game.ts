import LemController from './LemController';

const GAME_INTERVAL: number = 1000;

export default class Game {
  lemController: LemController;
  isRunning: boolean;

  constructor() {
    this.lemController = new LemController();
    this.isRunning = false;
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
      console.log('tick');
      setTimeout(this.tick.bind(this), GAME_INTERVAL);
    }
  }
}
