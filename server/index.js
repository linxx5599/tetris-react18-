const Koa = require("koa");
const app = new Koa();
const server = require("http").createServer(app.callback());
const {
  CONNECTION,
  DISCONNECT,
  SEND,
  GANE_OUVER,
  MESSAGE,
  USER_LIST
} = require("./config");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8888",
    methods: ["GET", "POST"],
    credentials: true
  }
});

//连接用户
let userConnectionMap = new Map();

//发送消息 single true 为指定用户
function send({ event, type, socket, data, single = false }) {
  let target = socket
  if (single) {
    target = io.to(socket.id)
  }
  target.emit(event, { type, data })
}

//收到的消息
function message({ mark }) {
  console.log(mark);
}

//收到的消息
function gameOver() {
  console.log("gameOver");
}

function getUserList() {
  const data = [];
  userConnectionMap.forEach((user) => {
    data.push(user);
  });
  return data;
}

//获取用户信息并且发出
function sendUserList(socket) {
  const userList = getUserList();
  send({
    event: MESSAGE,
    socket,
    single: true,
    type: USER_LIST,
    data: userList
  })

}

io.on("connect", (socket) => {
  console.log("连接成功");
  userConnectionMap.set(socket.id, {
    socketId: socket.id,
    name: getUserList().length + 1 + "你好"
  });
  socket.on(SEND, ({ type, data }) => {
    switch (type) {
      case MESSAGE:
        message(data);
        break;
      case GANE_OUVER:
        gameOver();
        break;
      case USER_LIST:
        sendUserList(socket);
        break;
      default:
        break;
    }
  });

  // 1. 接受 user 发过来的数据
  // 2. 广播给其他的 user
  socket.on(MESSAGE, (num) => { });

  //断开连接
  socket.on(DISCONNECT, () => {
    userConnectionMap.delete(socket.id);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
