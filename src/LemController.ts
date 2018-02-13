import Cue from './Cue';

const SPAWN_TIME: number = 100;

export default class LemController {
  maxLems: number;
  cue: Cue;

  constructor(maxLems: number = 30, firstSpawnDelay: number = 200) {
    this.maxLems = maxLems;
    this.cue = new Cue();
  }

  tick() {
    const next = this.cue.getNext();
    if (next && next.length) {
      next.forEach(n => n());
    }
  }
}
