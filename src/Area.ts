import { FLOOR, VOID, WALL } from './environments';

const SPAWN_POINT: { posX: number, posY: number } = { posX: 80, posY: 20 };

export default class Area {
  private spawnPoint: { posX: number, posY: number };

  constructor() {
    this.spawnPoint = SPAWN_POINT;
  }

  getSpawnPoint() {
    return this.spawnPoint;
  }

  getEnvironment(posX: number, posY: number): string {
    if (posX === 100 || posX === 10) {
      return WALL;

    } else if (posX === 30 && posY < 40) {
      return VOID;
    }

    return FLOOR;
  }
}
