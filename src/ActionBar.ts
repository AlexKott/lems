import Drawable from './interfaces/Drawable';
import Graphics from './Graphics';

const BAR_WIDTH = 100;
const CANVAS_OFFSET = 20;

export default class ActionBar implements Drawable {
  private posX: number;
  private posY: number;
  private graphics: Graphics;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.posX = canvasWidth - BAR_WIDTH;
    this.posY = CANVAS_OFFSET;
    this.graphics = new Graphics(
      BAR_WIDTH,
      canvasHeight - 2 * CANVAS_OFFSET,
      true,
      ''
    );
  }

  getPosX() : number {
    return this.posX;
  }

  getPosY() : number {
    return this.posY;
  }

  getGraphics() : Graphics {
    return this.graphics;
  }
}
