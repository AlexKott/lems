import Drawable from './Drawable';

const CANVAS_WIDTH: number = 600;
const CANVAS_HEIGHT: number = 400;

export default class Canvas {
  width: number = CANVAS_WIDTH;
  height: number = CANVAS_HEIGHT;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = <HTMLCanvasElement> document.querySelector('#canvas');
    this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
  }

  draw(elements: Array<Drawable>) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    elements.forEach(element => {
      this.ctx.fillText(element.getSign(), element.getPosX(), element.getPosY());
    });
  }
}
