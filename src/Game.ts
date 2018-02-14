import Area from './Area';
import Canvas from './Canvas';
import Lem from './Lem';
import LemController from './LemController';
import Tickable from './Tickable';

const GAME_INTERVAL: number = 40;

export default class Game {
  private isRunning: boolean;
  private area : Area;
  private canvas: Canvas;
  private lemController: LemController;
  private subscribers: Array<Tickable>;

  constructor() {
    this.isRunning = false;
    this.subscribers = [];
    this.area = new Area();
    this.lemController = new LemController(this.area);
    this.canvas = new Canvas();
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
      this.canvas.draw(this.lemController.getLems());
    }
  }
}
