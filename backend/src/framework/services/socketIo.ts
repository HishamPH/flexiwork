import { Server } from "socket.io";
import http from "http";
import express, { Application } from "express";
import ISocketIo from "../../usecases/interfaces/ISocketIo";
import IUserRepository from "../../usecases/interfaces/IUserRepository";
import UserRepository from "../repository/userRepository";

const app: Application = express();

const server = http.createServer(app);

export interface SocketEntry {
  userId: string;
  socketId: string;
}

export class SocketIo implements ISocketIo {
  private iUserRepository: IUserRepository;
  private ioInstance: Server;
  private userSocketMap: { [key: string]: string | undefined } = {};
  private socketMap: SocketEntry[] = [];
  constructor(iUserRepository: IUserRepository) {
    this.iUserRepository = iUserRepository;
    this.ioInstance = new Server(server, {
      cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "POST"],
      },
    });
    this.setupListeners();
  }

  private setupListeners() {
    try {
      this.ioInstance.on("connection", async (socket) => {
        const userId = socket.handshake.query?.userId as string;

        if (userId !== undefined) {
          console.log(
            "socket connected with id",
            socket.id,
            " with userId : ",
            userId
          );
          this.userSocketMap[userId] = socket.id;
          this.socketMap.push({
            socketId: socket.id,
            userId: userId,
          });
          const user = await this.iUserRepository.findUser(userId);
          this.ioInstance.to(socket.id).emit("userStatus", user);
        }
        this.ioInstance.emit("getOnlineUsers", Object.keys(this.userSocketMap));

        socket.on("disconnect", () => {
          console.log("disconnected the socket with id ", socket.id);
          this.socketMap = this.socketMap.filter(
            (item) => item.socketId !== socket.id
          );
          delete this.userSocketMap[userId];
          this.ioInstance.emit(
            "getOnlineUsers",
            Object.keys(this.userSocketMap)
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  private getAllSocketId(userId: string): SocketEntry[] {
    return this.socketMap.filter((item) => item.userId === userId);
  }

  private getSocketId(userId: string): any {
    return this.userSocketMap[userId];
  }

  async sendMessage(sender: string, receiver: string, data: any): Promise<any> {
    try {
      const allSender = this.getAllSocketId(sender);
      const allReceiver = this.getAllSocketId(receiver);
      if (allSender?.length !== 0) {
        allSender?.forEach((item: SocketEntry) => {
          this.ioInstance.to(item.socketId).emit("newMessage", data);
        });
      }
      if (allReceiver?.length !== 0) {
        allReceiver?.forEach((item: SocketEntry) => {
          this.ioInstance.to(item.socketId).emit("newMessage", data);
          this.ioInstance.to(item.socketId).emit("newNoti", data);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async meetAlert(sender: string, receiver: string, data: any): Promise<any> {
    try {
      const senders = this.getAllSocketId(sender.toString());
      const receivers = this.getAllSocketId(receiver.toString());
      const all = [...senders, ...receivers];
      all?.forEach((item) => {
        this.ioInstance.to(item.socketId).emit("meetAlert", data);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async demoteUser(users: any): Promise<any> {
    try {
      users.forEach((user: any) => {
        const ids = this.getAllSocketId(user._id);
        ids.forEach((item) => {
          this.ioInstance.to(item.socketId).emit("userStatus", user);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
}

const userRepository = new UserRepository();

export const socketIo = new SocketIo(userRepository);

export { app, server };
