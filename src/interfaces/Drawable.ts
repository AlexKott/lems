export default interface Drawable {
  getIsActive: () => boolean;
  getPosX: () => number;
  getPosY: () => number;
  getWidth: () => number;
  getHeight: () => number;
  getSign: () => string;
}
