export default class Graphics {
  private width: number;
  private height: number;
  private hasBorder: boolean;
  private sign: string;

  constructor(
    width: number,
    height: number,
    hasBorder: boolean,
    sign: string
  ) {
    this.width = width;
    this.height = height;
    this.hasBorder = hasBorder;
    this.sign = sign;
  }

  getWidth() : number {
    return this.width;
  }

  getHeight() : number {
    return this.height;
  }

  setHasBorder(hasBorder: boolean) {
    this.hasBorder = hasBorder;
  }

  getHasBorder() : boolean {
    return this.hasBorder;
  }

  getSign() : string {
    return this.sign;
  }
}
