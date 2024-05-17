import React, { useEffect } from "react";
import { CLASS_CELL, CLASS_BLOCK, ROW, COL } from "@/utils/config";
import { garameRun } from "@/share/Garme";

const Container: React.FC = () => {
  useEffect(() => {
    garameRun();
  }, []);
  return (
    <div className="tetris-box">
      {new Array(ROW).fill(0).map((_, x) => {
        return (
          <div
            className={`cell cell-${x} ${CLASS_CELL}-${x}`}
            data-x={x}
            key={x}
          >
            {new Array(COL).fill(0).map((__, y) => {
              return (
                <div
                  key={x + "" + y}
                  data-x={x}
                  data-y={y}
                  className={`block block-${y} ${CLASS_BLOCK}-${y}`}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Container;
