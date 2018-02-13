import Lem from './Lem';
import Queue from './Queue';
import Tickable from './Tickable';

const SPAWN_TIME: number = 2;

export default class LemController implements Tickable {
  maxLems: number;
  queue: Queue;
  lems: Array<Lem>;

  constructor(maxLems: number = 10, firstSpawnDelay: number = 3) {
    this.maxLems = maxLems;
    this.lems = [];
    this.queue = new Queue();

    for (let i = 0; i < maxLems; i++) {
      const delay = firstSpawnDelay + (i * SPAWN_TIME);
      this.queue.add(delay, this.spawn.bind(this));
    }
  }

  tick() {
    const next = this.queue.getNext();
    if (next && next.length) {
      next.forEach(n => n());
    }

    this.lems.forEach(l => l.tick());
  }

  spawn() {
    this.lems.push(new Lem());
  }
}
