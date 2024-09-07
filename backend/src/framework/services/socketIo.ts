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

export const getReceiverSocketId: any = (receiverId: string) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("socket connedcted with id", socket.id);

  const userId: any = socket.handshake.query.userId as string | undefined;
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  console.log(userSocketMap);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("disconnected the socket with id ", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
