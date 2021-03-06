import Area from './Area';
import isTarget from './isTarget';
import Lem from './Lem';
import Point from './interfaces/Point';
import Queue from './Queue';
import Tickable from './interfaces/Tickable';

const FIRST_SPAWN: number = 5;
const SPAWN_TIME: number = 80;
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

  getLems() : Array<Lem> {
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

  activateLem(target: Point) : Lem | null {
    const clickedLem = this.pointLem(target);
    this.lems.forEach(lem => lem.setActive(false));

    if (clickedLem) {
      clickedLem.setActive(true);
    }

    return clickedLem;
  }

  pointLem(target: Point) : Lem | null {
    const lastLem: number = this.lems.length - 1;

    for (let i: number = lastLem; i >= 0; i--) {
      const lem: Lem = this.lems[i];

      if (isTarget(lem, target)) {
        return lem;
      }
    }

    return null;
  }
}
