import Drawable from './interfaces/Drawable';
import Point from './interfaces/Point';

export default class Canvas {
  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  listeners: {
    click: Array<(clickTarget: Point) => void>,
    mousemove: Array<(clickTarget: Point) => void>,
  };

  constructor(canvasElement: HTMLCanvasElement) {
    const canvasOffset = canvasElement.getBoundingClientRect();
    this.canvasElement = canvasElement;
    this.context = <CanvasRenderingContext2D> this.canvasElement.getContext('2d');
    this.width = this.canvasElement.width;
    this.height = this.canvasElement.height;
    this.offsetX = Math.round(canvasOffset.left);
    this.offsetY = Math.round(canvasOffset.top);
    this.listeners = {
      click: [],
      mousemove: [],
    };

    this.context.textBaseline = 'top';
    this.canvasElement.addEventListener('click', this.handleEvent.bind(this));
    this.canvasElement.addEventListener('mousemove', this.handleEvent.bind(this));
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw(element: Drawable) {
    const posX = element.getPosX();
    const posY = element.getPosY();
    const graphics = element.getGraphics();
    const width = graphics.getWidth();
    const height = graphics.getHeight();
    const sign = graphics.getSign();
    const hasBorder = graphics.getHasBorder();

    this.context.font = `${height}px sans-serif`;
    this.context.fillText(sign, posX, posY);

    if (hasBorder) {
      this.context.strokeRect(posX, posY, width, height);
    }
  }

  drawMultiple(elements: Array<Drawable>) {
    elements.forEach(element => this.draw(element));
  }

  addListener(type: 'click' | 'mousemove', callback: (target: Point) => void) {
    this.listeners[type].push(callback);
  }

  handleEvent(event: MouseEvent) {
    if (event.type === 'click' || event.type === 'mousemove') {
      const target = {
        posX: event.clientX - this.offsetX,
        posY: event.clientY - this.offsetY,
      }
      this.listeners[event.type].forEach(l => l(target));
    }
  }
}
