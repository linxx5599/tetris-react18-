import React, { useState } from "react";

import { getUserList } from "@/utils/socket";
import Container from "@/components/Container";
import Mark from "@/components/Mark";
import List from "@/components/List";

import Modal from "@/components/Modal";

const bg = require("@/assets/images/bg.png").default;

type row = {
  socketId: React.Key;
  name: String;
};

const App: React.FC = () => {
  const [open, setOpen] = useState<Boolean>(false);

  const [data, setData] = useState<row[]>([]);

  const openModal = () => {
    setOpen(true);
    getUserList().then((res) => {
      console.log(res, "res");
    });
    setData([]);
  };

  return (
    <div className="warp" style={{ backgroundImage: `url(${bg})` }}>
      <div className="box">
        <Container />
        <div className="box-right">
          <Mark />
          <button className="btn" onClick={openModal}>
            联机对战
          </button>
        </div>
      </div>
      <Modal visible={open} open={setOpen} title="用户列表">
        <List dataSource={data}></List>
      </Modal>
    </div>
  );
};

export default App;
