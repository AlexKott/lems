import Area from './Area';
import Canvas from './Canvas';
import Lem from './Lem';
import LemController from './LemController';
import Point from './interfaces/Point';
import Tickable from './interfaces/Tickable';
import levelMap from './map.json';

const GAME_INTERVAL: number = 20;

export default class Game {
  private area: Area;
  private canvas: Canvas;
  private isRunning: boolean;
  private lemController: LemController;
  private subscribers: Array<Tickable>;

  constructor(canvasElement: HTMLCanvasElement) {
    this.area = new Area(levelMap);
    this.canvas = new Canvas(canvasElement);
    this.isRunning = false;
    this.lemController = new LemController(this.area);
    this.subscribers = [];

    this.canvas.addClickListener(this.handleClick.bind(this));
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

  handleClick(clickTarget: Point) {
    this.lemController.handleClick(clickTarget);
  }
}
