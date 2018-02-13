export default class Queue {
  private queue: Array<Array<() => void>>;

  constructor() {
    this.queue = [];
  }

  add(position: number, method: () => void) {
    if (!this.queue[position]) {
      this.queue[position] = [];
    }
    this.queue[position].push(method);
  }

  getNext() : Array<() => void> | void {
    return this.queue.shift();
  }
}
