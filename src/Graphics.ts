export default class Graphics {
  private isVisible: boolean;
  private hasBorder: boolean;
  private width: number;
  private height: number;
  private sign: string;

  constructor(
    width: number,
    height: number,
    sign: string,
    hasBorder: boolean,
    isVisible: boolean
  ) {
    this.width = width;
    this.height = height;
    this.sign = sign;
    this.hasBorder = hasBorder;
    this.isVisible = isVisible;
  }

  getWidth() : number {
    return this.width;
  }

  getHeight() : number {
    return this.height;
  }

  getSign() : string {
    return this.sign;
  }

  setHasBorder(hasBorder: boolean) {
    this.hasBorder = hasBorder;
  }

  getHasBorder() : boolean {
    return this.hasBorder;
  }

  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }

  getIsVisible() : boolean {
    return this.isVisible;
  }
}
