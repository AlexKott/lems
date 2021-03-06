import ActionBar from './ActionBar';
import Area from './Area';
import Canvas from './Canvas';
import isTarget from './isTarget';
import Lem from './Lem';
import LemController from './LemController';
import Point from './interfaces/Point';
import Tickable from './interfaces/Tickable';
import levelMap from './map.json';

export default class Game {
  private actionBar: ActionBar;
  private area: Area;
  private canvas: Canvas;
  private isRunning: boolean;
  private lemController: LemController;
  private subscribers: Array<Tickable>;

  constructor(canvasElement: HTMLCanvasElement) {
    this.actionBar = new ActionBar(canvasElement.width, canvasElement.height);
    this.area = new Area(levelMap);
    this.canvas = new Canvas(canvasElement);
    this.isRunning = false;
    this.lemController = new LemController(this.area);
    this.subscribers = [];

    this.canvas.addListener('click', this.handleClick.bind(this));
    this.canvas.addListener('mousemove', this.handleMouseMove.bind(this));
    this.subscribers.push(this.lemController);
  }

  start() {
    this.isRunning = true;
    this.tick(0);
  }

  end() {
    this.isRunning = false;
  }

  tick(stamp: number) {
    if (this.isRunning) {
      window.requestAnimationFrame(this.tick.bind(this));
      this.subscribers.forEach(s => s.tick());
      this.draw();
    }
  }

  draw() {
    this.canvas.clear();
    this.canvas.drawMultiple(this.lemController.getLems());
    this.canvas.draw(this.actionBar);
  }

  handleClick(target: Point) {
    const isActionBarClicked = isTarget(this.actionBar, target);
    if (isActionBarClicked) {
      console.log('action');
    } else {
      const activeLem = this.lemController.activateLem(target);
      this.actionBar.setActiveLem(activeLem);
    }
  }

  handleMouseMove(target: Point) {
    const isOverActiveBar = isTarget(this.actionBar, target);
    if (isOverActiveBar) {
      document.body.style.cursor = 'pointer';

    } else if (!!this.lemController.pointLem(target)) {
      document.body.style.cursor = 'crosshair';

    } else {
      document.body.style.cursor = 'initial';
    }
  }
}
