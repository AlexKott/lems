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

    this.context.textBaseline = 'top';
    this.canvasElement.addEventListener('click', this.handleClick.bind(this));
  }

  draw(elements: Array<Drawable>) {
    this.context.clearRect(0, 0, this.width, this.height);
    elements.forEach(element => {
      const posX = element.getPosX();
      const posY = element.getPosY();
      const width = element.getWidth();
      const height = element.getHeight();
      const sign = element.getSign();
      const isActive = element.getIsActive();

      if (isActive) {
        this.context.strokeRect(posX, posY, width, height);
      } else {
        this.context.strokeText(sign, posX, posY);
      }
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
