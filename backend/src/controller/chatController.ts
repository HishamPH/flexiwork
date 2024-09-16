import { Request, Response, NextFunction } from "express";
import ChatUseCase from "../usecases/chatUseCases";
import {
  getReceiverSocketId,
  io,
  getAllReciverSocketId,
  SocketEntry,
} from "../framework/services/socketIo";

class ChatController {
  private chatCase: ChatUseCase;
  constructor(chatCase: ChatUseCase) {
    this.chatCase = chatCase;
  }
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const receiverId = req.params.id;
      const { message, senderId } = req.body;
      const messageData = await this.chatCase.sendMessage(
        senderId,
        receiverId,
        message
      );

      //socket io programs
      const allSenderSocketId: SocketEntry[] = getAllReciverSocketId(senderId);

      const receiverSocketId = getReceiverSocketId(receiverId);
      const allReceiverSocketId: SocketEntry[] =
        getAllReciverSocketId(receiverId);

      if (allSenderSocketId?.length !== 0) {
        allSenderSocketId.forEach((item: SocketEntry) => {
          io.to(item.socketId).emit("newMessage", messageData);
        });
      }
      if (receiverSocketId && allReceiverSocketId?.length !== 0) {
        console.log("message emitted");

        allReceiverSocketId.forEach((item: SocketEntry) => {
          io.to(item.socketId).emit("newMessage", messageData);
        });
        //io.to(receiverSocketId).emit("newMessage", messageData);
      }

      return res.status(messageData?.statusCode).json({ ...messageData });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const receiverId = req.params.id;
      const { senderId } = req.body;
      const messages = await this.chatCase.getMessages(senderId, receiverId);
      return res.status(messages?.statusCode).json({ ...messages });
    } catch (err) {}
  }
  async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const { senderId } = req.body;
      const conversations = await this.chatCase.getConversations(senderId);
      return res.status(conversations?.statusCode).json({ ...conversations });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default ChatController;
