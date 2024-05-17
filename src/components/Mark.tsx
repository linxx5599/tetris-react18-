import { garmeMap } from "@/share/Garme";
import React, { useEffect, useState } from "react";

import { sendMark } from "@/utils/socket";

const Mark: React.FC = () => {
  const [mark, setMark] = useState(0);
  useEffect(() => {
    if (garmeMap) {
      garmeMap.onMark((mark: number) => {
        setMark(mark);
        //给服务的io发送得分
        sendMark(mark);
      });
    }
  }, []);
  return (
    <div className="mark">
      <div className="title">得分：</div>
      <div className="content">{mark}</div>
    </div>
  );
};
export default Mark;
