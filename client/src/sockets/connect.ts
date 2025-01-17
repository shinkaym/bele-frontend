// src/sockets/socket.ts
import { io, Socket } from "socket.io-client";


const SOCKET_URL = "http://localhost:4000";

// Tạo một socket instance
export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"], // Sử dụng WebSocket
  autoConnect: false,        // Không tự động kết nối
});

// Hàm để kết nối socket
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
    console.log("Socket connected!");
  }
};

// Hàm để ngắt kết nối socket
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("Socket disconnected!");
  }
};
