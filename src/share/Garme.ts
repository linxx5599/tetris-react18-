import {
  CLASS_CELL,
  CLASS_BLOCK,
  ROW,
  COL,
  UNDERBLOCK_SPEED
} from "@/utils/config";
import GarmeMap from "@/share/map";
import Block from "@/share/Block";
import { sendGameOver } from "@/utils/socket";
export default class Garme {
  row: number;
  col: number;
  constructor() {
    this.row = ROW;
    this.col = COL;
  }
  getCell(x: string | number): HTMLElement {
    return document.querySelector(`.${CLASS_CELL}-${x}`) as HTMLElement;
  }

  getBlock(x: string | number, y: string | number): HTMLElement {
    const cell = this.getCell(x);
    return cell.querySelector(`.${CLASS_BLOCK}-${y}`) as HTMLElement;
  }

  //给盒子设置颜色
  setColor(x: string | number, y: string | number) {
    this.updateColor(x, y, "add");
  }
  delColor(x: string | number, y: string | number) {
    this.updateColor(x, y, "del");
  }
  //给盒子设置颜色
  updateColor(x: string | number, y: string | number, type: "add" | "del") {
    const block = this.getBlock(x, y);
    if (type === "add") {
      block.classList.add("show");
      return;
    }
    block.classList.remove("show");
  }

  clear() {
    for (let x = 0; x < this.row; x++) {
      for (let y = 0; y < this.col; y++) {
        this.delColor(x, y);
      }
    }
  }
}

let block: Block;
export let garmeMap: GarmeMap;
let isBindEvent = false;
function keydownEvnet(event: any) {
  switch (event.keyCode) {
    //left
    case 37:
      block.left(garmeMap);
      break;
    //top
    case 38:
      block.top(garmeMap);
      break;
    //right
    case 39:
      block.right(garmeMap);
      break;
    //bottom
    case 40:
      block.bottom(garmeMap);
      break;
    default:
      break;
  }
}

function bindEvent() {
  if (isBindEvent) return;
  document.addEventListener("keydown", keydownEvnet);
  isBindEvent = true;
}

let rAF = (fn: FrameRequestCallback): number =>
  window.requestAnimationFrame
    ? window.requestAnimationFrame(fn)
    : setTimeout(fn, 16);
let cAF = (timer: number) =>
  window.cancelAnimationFrame
    ? window.cancelAnimationFrame(timer)
    : clearTimeout(timer);

export function garameRun() {
  let timer: NodeJS.Timeout;
  let handeRaf: number;
  let stop = false;
  const garme = new Garme();
  block = new Block();
  garmeMap = new GarmeMap();
  //绑定事件
  bindEvent();
  run();
  function run() {
    handeRaf = rAF(() => {
      if (stop) {
        handeRaf && cAF(handeRaf);
      }
      garme.clear();
      block.render(garme);
      garmeMap.render(garme);
      run();
    });
  }
  timer = setInterval(() => {
    stop = block.next(garmeMap);
    //触碰到底部则重新渲染block & 存入到地图
    if (stop) {
      garmeMap.renderMap(block);
      block = new Block();
      garmeMap.remove();
      const gameOver = garmeMap.checkOver();
      if (gameOver) {
        handeRaf && cAF(handeRaf);
        clearInterval(timer);
        setTimeout(() => {
          sendGameOver();
          alert("GAME OVER");
          // garameRun();
        });
      }
    }
  }, UNDERBLOCK_SPEED);
}
