import { DefaultEventsMap } from "@socket.io/component-emitter";
import socketIo, { Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3001";
const CONNECTION = "connect";
const DISCONNECT = "disconnect";
const SEND = "send";
const GANE_OUVER = "game_over";
const MESSAGE = "message";
const USER_LIST = "user_list";

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;

let userResolve: ((value: unknown) => void) | null;
export default function () {
  if (socket) return;
  socket = socketIo(SOCKET_URL, { withCredentials: true });
  console.log(socket, CONNECTION);
  socket.on(CONNECTION, () => {
    console.log("%c监听客户端连接成功-connect", "color: red");
    if (!socket) return;
  });

  //接收消息
  socket.on(GANE_OUVER, () => {
    console.log(GANE_OUVER);
  });

  //接收消息
  socket.on(MESSAGE, ({ type, data }) => {
    //USER_LIST
    console.log(MESSAGE, type, data);
    if (userResolve && type === USER_LIST) {
      userResolve(data);
      userResolve = null;
    }
  });
  socket.on(DISCONNECT, () => {
    socket = null;
    console.log("%c服务端断开连接", "color: red");
  });
}
export function disconnect() {
  if (socket) {
    console.log("%c客户端主动断开连接", "color: red");
    socket.disconnect();
    socket = null;
  }
}

//发送得分消息
export function sendMark(mark: number) {
  if (!socket) return;
  socket.emit(SEND, { type: MESSAGE, data: { mark } });
}

//发送游戏结束通知
export function sendGameOver() {
  if (!socket) return;
  socket.emit(SEND, { type: GANE_OUVER });
}

//获取所以连接的用户列表
export function getUserList(): Promise<unknown> {
  if (!socket) return Promise.resolve([]);
  socket.emit(SEND, { type: USER_LIST });
  return new Promise((resolve) => {
    userResolve = resolve;
  });
}
