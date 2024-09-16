import { Server } from "socket.io";
import http, { ServerResponse } from "http";
import express, { Application } from "express";
import { config } from "dotenv";
const app: Application = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap: { [key: string]: string | undefined } = {};

export interface SocketEntry {
  receiverId: string;
  socketId: string;
}

let receiverSocketMap: SocketEntry[] = [];

export const getAllReciverSocketId: any = (
  receiverId: string
): SocketEntry[] | null => {
  return receiverSocketMap.filter((item) => item.receiverId === receiverId);
};

export const getReceiverSocketId: any = (receiverId: string) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("socket connedcted with id", socket.id);
  const userId: any = socket.handshake.query.userId as string | undefined;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
    receiverSocketMap.push({ socketId: socket.id, receiverId: userId });
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("disconnected the socket with id ", socket.id);
    receiverSocketMap = receiverSocketMap.filter(
      (item) => item.socketId !== socket.id
    );
    console.log(receiverSocketMap);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
