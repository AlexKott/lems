import Area from './Area';
import Drawable from './Drawable';
import Queue from './Queue';
import Tickable from './Tickable';
import { FLOOR, VOID, WALL } from './environments';

const FALL_INTERVAL: number = 1;
const WALK_INTERVAL: number = 2;

export default class Lem implements Tickable, Drawable {
  private area: Area;
  private direction: number = 1;
  private posX: number;
  private posY: number;
  private queue: Queue;
  private sign: string = 'Y';

  constructor(area: Area) {
    const spawnPoint = area.getSpawnPoint();
    this.posX = spawnPoint.posX;
    this.posY = spawnPoint.posY;
    this.area = area;
    this.queue = new Queue();
    this.queue.add(WALK_INTERVAL, this.walk.bind(this));
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
    const newPosX: number = this.posX + this.direction;
    const nextEnv: string = this.area.getEnvironment(newPosX, this.posY);
    this.react(newPosX, this.posY, nextEnv);
  }

  fall() {
    const newPosY: number = this.posY + 1;
    const nextEnv: string = this.area.getEnvironment(this.posX, newPosY);
    this.react(this.posX, newPosY, nextEnv);
  }

  react(posX: number, posY: number, env: string) {
    if (env === FLOOR) {
      this.posX = posX;
      this.posY = posY;
      this.queue.add(WALK_INTERVAL, this.walk.bind(this));

    } else if (env === WALL) {
      this.direction = this.direction * -1;
      this.queue.add(WALK_INTERVAL, this.walk.bind(this));

    } else if (env === VOID) {
      this.posX = posX;
      this.posY = posY;
      this.queue.add(FALL_INTERVAL, this.fall.bind(this));
    }
  }
}
