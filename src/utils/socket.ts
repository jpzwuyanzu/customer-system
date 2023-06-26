import { io } from 'socket.io-client';

const socket = io('https://web2.loggi.vip', {
    transports: ['websocket'], // 指定传输方式，如WebSocket
    autoConnect: true, // 是否自动连接
    reconnection: true, // 是否自动重新连接
    reconnectionAttempts: 3, // 重新连接尝试次数
    reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
    query: { token: 'your-token' }, // 自定义查询参数
  });

socket.on('connect', () => {
  console.log('已连接到 Socket.IO 服务器');
});

socket.on('disconnect', () => {
  console.log('已断开 Socket.IO 连接');
});

socket.on('message', (data: any) => {
  console.log(`收到消息：${data}`);
});

function sendMessage(message: string) {
  socket.emit('message', message);
  console.log(`发送消息：${message}`);
}

export { socket, sendMessage };
