import Drawable from './interfaces/Drawable';
import Point from './interfaces/Point';

export default function isTarget(element: Drawable, target: Point) : boolean {
  const { posX, posY } = target;
  const elemX = element.getPosX();
  const elemY = element.getPosY();
  const graphics = element.getGraphics();

  if (
    graphics.getIsVisible()
    && posX >= elemX
    && posX <= elemX + graphics.getWidth()
    && posY >= elemY
    && posY <= elemY + graphics.getHeight()
  ) {
    return true;
  }

  return false;
}
