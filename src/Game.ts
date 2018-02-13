import Canvas from './Canvas';
import Lem from './Lem';
import LemController from './LemController';
import Tickable from './Tickable';

const GAME_INTERVAL: number = 100;
const MAX_LEMS: number = 10;
const SPAWN_TIME: number = 2;
const SPAWN_POINT: { posX: number, posY: number } = { posX: 10, posY: 20 };

export default class Game {
  private isRunning: boolean;
  private subscribers: Array<Tickable>;
  private lemController: LemController;
  private canvas: Canvas;

  constructor() {
    this.isRunning = false;
    this.subscribers = [];
    this.lemController = new LemController(MAX_LEMS, SPAWN_TIME, SPAWN_POINT);
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
      this.canvas.draw(this.lemController.lems);
    }
  }
}
