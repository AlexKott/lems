import Drawable from './Drawable';
import Tickable from './Tickable';

export default class Lem implements Tickable, Drawable {
  public posX: number;
  public posY: number;
  public sign: string = 'Y';

  constructor(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
  }

  tick() {
    this.walk();
  }

  walk() {
    this.posX += 1;
  }
}
