import { Request, Response, NextFunction } from "express";
import ChatUseCase from "../usecases/chatUseCases";
import { getReceiverSocketId, io } from "../framework/services/socketIo";

class ChatController {
  private chatCase: ChatUseCase;
  constructor(chatCase: ChatUseCase) {
    this.chatCase = chatCase;
  }
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const receiverId = req.params.id;
      const { message, senderId } = req.body;
      console.log(message, senderId, receiverId);
      const messageData = await this.chatCase.sendMessage(
        senderId,
        receiverId,
        message
      );

      //socket io programs

      const receiverSocketId = getReceiverSocketId(receiverId);
      console.log(receiverSocketId);
      if (receiverSocketId) {
        console.log("message emitted");
        io.to(receiverSocketId).emit("newMessage", messageData);
      }

      return res.status(messageData?.statusCode).json({ ...messageData });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const receiverId = req.params.id;
      const { senderId } = req.body;
      const messages = await this.chatCase.getMessages(senderId, receiverId);
      return res.status(messages?.statusCode).json({ ...messages });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default ChatController;
