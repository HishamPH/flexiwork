import { Request, Response, NextFunction } from "express";
import ChatUseCase from "../usecases/chatUseCases";

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

  async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.chatCase.getNotifications(id);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async clearNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      const result = await this.chatCase.clearNotifications(userId);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async deleteNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { notificationId } = req.body;
      const result = await this.chatCase.deleteNotification(notificationId);
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default ChatController;
