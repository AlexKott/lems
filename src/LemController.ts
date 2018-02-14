import Area from './Area';
import Lem from './Lem';
import Queue from './Queue';
import Tickable from './Tickable';

const FIRST_SPAWN: number = 5;
const SPAWN_TIME: number = 30;
const MAX_LEMS: number = 10;

export default class LemController implements Tickable {
  private lems: Array<Lem>;
  private area: Area;
  private queue: Queue;

  constructor(area: Area) {
    this.lems = [];
    this.queue = new Queue();
    this.area = area;

    for (let i = 0; i < MAX_LEMS; i++) {
      const delay = FIRST_SPAWN + (i * SPAWN_TIME);
      this.queue.add(delay, this.spawn.bind(this));
    }
  }

  getLems() {
    return this.lems;
  }

  tick() {
    const next = this.queue.getNext();
    if (next && next.length) {
      next.forEach(n => n());
    }

    this.lems.forEach(l => l.tick());
  }

  spawn() {
    this.lems.push(new Lem(this.area));
  }
}
