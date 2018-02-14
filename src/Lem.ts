import Area from './Area';
import Drawable from './Drawable';
import Queue from './Queue';
import Tickable from './Tickable';

const WALK_SPEED: number = 1;

export default class Lem implements Tickable, Drawable {
  private posX: number;
  private posY: number;
  private sign: string = 'Y';
  private queue: Queue;

  constructor(area: Area) {
    const spawnPoint = area.getSpawnPoint();
    this.posX = spawnPoint.posX;
    this.posY = spawnPoint.posY;
    this.queue = new Queue();
    this.queue.add(WALK_SPEED, this.walk.bind(this));
  }

  getPosX() {
    return this.posX;
  }

  getPosY() {
    return this.posY;
  }

  getSign() {
    return this.sign;
  }

  tick() {
    const next = this.queue.getNext();
    if (next && next.length) {
      next.forEach(n => n());
    }
  }

  walk() {
    this.posX += 2;
    this.queue.add(WALK_SPEED, this.walk.bind(this));
  }
}
