import { blockMapTypes } from "@/types";

export const BASE_URL = process.env.REACT_APP_BASE_API;
export const CLASS_CELL = "cell";
export const CLASS_BLOCK = "block";
//11 * 20 block
export const ROW = 20;
export const COL = 11;

//方块下落速度
export const UNDERBLOCK_SPEED = 500;
//得分
export const BLOCK_MARK = 10;

//方块所有类型
export const BLOCK_MAP_TRYPES: Array<blockMapTypes> = [
  "I",
  "L",
  "J",
  "Z",
  "S",
  "T",
  "O"
];
