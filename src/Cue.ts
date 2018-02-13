export default class Cue {
  cue: Array<Array<() => void>>;

  constructor() {
    this.cue = [];
  }

  add(method: () => void, delay: number) {
    if (!this.cue[delay]) {
      this.cue[delay] = [];
    }
    this.cue[delay].push(method);
  }

  getNext() : Array<() => void> | void {
    return this.cue.shift();
  }
}
