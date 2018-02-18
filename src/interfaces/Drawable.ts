import Graphics from '../Graphics';

export default interface Drawable {
  getPosX: () => number;
  getPosY: () => number;
  getGraphics: () => Graphics;
}
