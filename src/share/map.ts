import { ROW, COL, BLOCK_MARK } from "@/utils/config";
import Garme from "@/share/Garme";
import Block from "@/share/Block";

export default class GameMap {
  mapData: number[][];
  row: number;
  col: number;
  blockMark: number;
  markCallbackDep: Function[];
  constructor() {
    this.markCallbackDep = [];
    this.row = ROW;
    this.col = COL;
    this.blockMark = 0;
    //地图数据
    this.mapData = this.getMapData();
  }

  getRow(num: number): number[] {
    return new Array(this.col).fill(num);
  }

  getMapData() {
    const data = [];
    for (let x = 0; x < this.row; x++) {
      data.push(this.getRow(0));
    }
    //添加一层数据 类型于蒙层
    data.push(this.getRow(9));
    return data;
  }

  renderMap(Block: Block) {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (Block.block[x][y] !== 0) {
          this.mapData[x + Block.blockRow][y + Block.blockCol] =
            Block.block[x][y];
        }
      }
    }
  }

  updateMapData(x: number, y: number, value: number) {
    this.mapData[x][y] = value;
  }

  render(Garme: Garme) {
    for (let x = 0; x < this.row; x++) {
      for (let y = 0; y < this.col; y++) {
        if (this.mapData[x][y] !== 0) {
          Garme.setColor(x, y);
        }
      }
    }
  }

  remove() {
    for (let x = 0; x < this.row; x++) {
      //未找到0则消除
      let magnification = 0;
      if (!this.mapData[x].includes(0)) {
        magnification += 1;
        this.mapData.splice(x, 1);
        this.mapData.unshift(this.getRow(0));
      }
      if (magnification) {
        this.blockMark += BLOCK_MARK * magnification;
        this.runMarkCallback();
      }
    }
  }

  onMark(fn: Function) {
    if (typeof fn !== "function") {
      throw new Error(`${fn} in not a function`);
    }
    this.markCallbackDep.push(fn);
    fn(this.blockMark);
  }

  runMarkCallback() {
    this.markCallbackDep.forEach((fn) => fn(this.blockMark));
  }

  //GAME OVER
  checkOver() {
    return this.mapData[0].some((d) => d !== 0);
  }
}
