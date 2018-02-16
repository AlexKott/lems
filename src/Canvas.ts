import Drawable from './interfaces/Drawable';
import Point from './interfaces/Point';

export default class Canvas {
  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  clickListeners: Array<(clickTarget: Point) => void>;

  constructor(canvasElement: HTMLCanvasElement) {
    const canvasOffset = canvasElement.getBoundingClientRect();

    this.canvasElement = canvasElement;
    this.context = <CanvasRenderingContext2D> this.canvasElement.getContext('2d');
    this.width = this.canvasElement.width;
    this.height = this.canvasElement.height;
    this.clickListeners = [];
    this.offsetX = Math.round(canvasOffset.left);
    this.offsetY = Math.round(canvasOffset.top);

    this.canvasElement.addEventListener('click', this.handleClick.bind(this));
  }

  draw(elements: Array<Drawable>) {
    this.context.clearRect(0, 0, this.width, this.height);
    elements.forEach(element => {
      this.context.fillText(element.getSign(), element.getPosX(), element.getPosY());
    });
  }

  addClickListener(callback: (clickTarget: Point) => void) {
    this.clickListeners.push(callback);
  }

  handleClick(event: MouseEvent) {
    const clickTarget = {
      posX: event.clientX - this.offsetX,
      posY: event.clientY - this.offsetY,
    }
    this.clickListeners.forEach(l => l(clickTarget));
  }
}
