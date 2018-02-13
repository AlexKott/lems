import Lem from './Lem';
import Queue from './Queue';
import Tickable from './Tickable';

const SPAWN_TIME: number = 10;

export default class LemController implements Tickable {
  public lems: Array<Lem>;
  private maxLems: number;
  private queue: Queue;
  private spawnPoint: { posX: number, posY: number };

  constructor(
    maxLems: number,
    firstSpawnDelay: number,
    spawnPoint: { posX: number, posY: number },
  ) {

    this.maxLems = maxLems;
    this.spawnPoint = spawnPoint;
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
    this.lems.push(new Lem(this.spawnPoint.posX, this.spawnPoint.posY));
  }
}
