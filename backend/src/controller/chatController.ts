import { Request, Response, NextFunction } from "express";
import ChatUseCase from "../usecases/chatUseCases";

class ChatController {
  private chatCase: ChatUseCase;
  constructor(chatCase: ChatUseCase) {
    this.chatCase = chatCase;
  }
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const messageData = req.body;
      const message = await this.chatCase.sendMessage(messageData);
      return res.status(message?.statusCode).json({ ...message });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default ChatController;
