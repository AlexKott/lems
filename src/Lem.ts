import Area from './Area';
import Drawable from './interfaces/Drawable';
import Graphics from './Graphics';
import Queue from './Queue';
import Tickable from './interfaces/Tickable';
import { FLOOR, SPAWN, VOID, WALL } from './environments';

const LEM_SIGN: string = 'Y';
const LEM_WIDTH: number = 12;
const LEM_HEIGHT: number = 15;
const FALL_INTERVAL: number = 1;
const WALK_INTERVAL: number = 2;

export default class Lem implements Tickable, Drawable {
  private area: Area;
  private direction: number;
  private isActive: boolean = false;
  private posX: number;
  private posY: number;
  private graphics: Graphics;
  private queue: Queue;

  constructor(area: Area, direction: number) {
    const spawnPoint = area.getSpawnPoint();
    this.area = area;
    this.direction = direction;
    this.graphics = new Graphics(
      LEM_WIDTH,
      LEM_HEIGHT,
      LEM_SIGN,
      this.isActive,
      true
    );
    this.posX = spawnPoint.posX;
    this.posY = spawnPoint.posY;
    this.queue = new Queue();

    this.queue.add(WALK_INTERVAL, this.walk.bind(this));
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
    this.reactToEnv(newPosX, this.posY, nextEnv);
  }

  fall() {
    const newPosY: number = this.posY + 1;
    const nextEnv: string = this.area.getEnvironment(this.posX, newPosY);
    this.reactToEnv(this.posX, newPosY, nextEnv);
  }

  reactToEnv(posX: number, posY: number, env: string) {
    if (env === FLOOR) {
      this.posX = posX;
      this.posY = posY;
      this.queue.add(WALK_INTERVAL, this.walk.bind(this));

    } else if (env === WALL) {
      this.direction = this.direction * -1;
      this.queue.add(WALK_INTERVAL, this.walk.bind(this));

    } else if (env === VOID || env === SPAWN) {
      this.posX = posX;
      this.posY = posY;
      this.queue.add(FALL_INTERVAL, this.fall.bind(this));
    }
  }

  setActive(isActive: boolean) {
    this.isActive = isActive;
    this.graphics.setHasBorder(isActive);
  }

  getIsActive() : boolean {
    return this.isActive;
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
