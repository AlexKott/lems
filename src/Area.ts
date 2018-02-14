const SPAWN_POINT: { posX: number, posY: number } = { posX: 10, posY: 20 };

export default class Area {
  private spawnPoint: { posX: number, posY: number };

  constructor() {
    this.spawnPoint = SPAWN_POINT;
  }

  getSpawnPoint() {
    return this.spawnPoint;
  }
}
