import Area from './Area';
import Lem from './Lem';
import Point from './interfaces/Point';
import Queue from './Queue';
import Tickable from './interfaces/Tickable';

const FIRST_SPAWN: number = 5;
const SPAWN_TIME: number = 30;
const MAX_LEMS: number = 10;
const LEM_DIRECTION: number = 1;

export default class LemController implements Tickable {
  private area: Area;
  private lems: Array<Lem>;
  private queue: Queue;

  constructor(area: Area) {
    this.area = area;
    this.lems = [];
    this.queue = new Queue();

    for (let i = 0; i < MAX_LEMS; i++) {
      const delay = FIRST_SPAWN + (i * SPAWN_TIME);
      this.queue.add(delay, this.spawn.bind(this));
    }
  }

  getLems() {
    return this.lems;
  }

  spawn() {
    this.lems.push(new Lem(this.area, LEM_DIRECTION));
  }

  tick() {
    const next = this.queue.getNext();
    if (next && next.length) {
      next.forEach(n => n());
    }

    this.lems.forEach(l => l.tick());
  }

  handleClick(target: Point) {
    const clickedLem = this.pointLem(target);

    if (clickedLem) {
      this.lems.forEach(lem => lem.setActive(false));
      clickedLem.setActive(true);
    }
  }

  pointLem(target: Point) : Lem | false {
    const lastLem: number = this.lems.length - 1;
    const { posX, posY } = target;

    for (let i: number = lastLem; i >= 0; i--) {
      const lem: Lem = this.lems[i];
      const lemX: number = lem.getPosX();
      const lemY: number = lem.getPosY();

      if (posX >= lemX
        && posX <= lemX + lem.getWidth()
        && posY >= lemY
        && posY <= lemY + lem.getHeight()
      ) {
        return lem;
      }
    }

    return false;
  }
}
