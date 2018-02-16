import { FLOOR, SPAWN, VOID, WALL } from './environments';
import Point from './interfaces/Point';
import { map } from './map';

export default class Area {
  private spawnPoint: Point;
  private map:Array<Array<number>> = map;

  constructor() {
    this.spawnPoint = this.findSpawnPoint();
  }

  getSpawnPoint() {
    return this.spawnPoint;
  }

  findSpawnPoint(): Point {
    const mapHeight = map.length;
    const mapWidth = map[0].length;
    for (let yTile = 0; yTile < mapHeight; yTile++) {
      for (let xTile = 0; xTile < mapWidth; xTile++) {
        const envCode = this.map[yTile][xTile];
        const env = this.translateEnvironmentCode(envCode);
        if (env === SPAWN) {
          return { posX: xTile * 10, posY: yTile * 10 };
        }
      }
    }
    throw new Error('No spawn point found in given map!');
  }

  getEnvironment(posX: number, posY: number): string {
    const tileX: number = Math.floor(posX / 10);
    const tileY: number = Math.floor(posY / 10);
    const envCode: number = this.map[tileY][tileX];
    return this.translateEnvironmentCode(envCode);
  }

  translateEnvironmentCode(code: number): string {
    switch(code) {
      case 1:
        return FLOOR;
      case 2:
        return WALL;
      case 3:
        return SPAWN;
      default:
        return VOID;
    }
  }
}
