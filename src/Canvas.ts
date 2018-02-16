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
