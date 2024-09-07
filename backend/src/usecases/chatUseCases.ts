import Chat from "../entity/chatEntity";
import Message from "../entity/messageEntity";
import IChatRepsoitory from "./interfaces/IChatRepository";
interface ResponseType {
  _id?: string;
  result?: Chat | {} | null;
  status?: boolean;
  statusCode: number;
  message?: string;
}

class ChatUseCase {
  private iChatRepository: IChatRepsoitory;
  constructor(iChatRepository: IChatRepsoitory) {
    this.iChatRepository = iChatRepository;
  }

  async sendMessage(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<ResponseType> {
    try {
      let chat = await this.iChatRepository.findChat(senderId, receiverId);
      if (!chat) {
        chat = await this.iChatRepository.createChat(senderId, receiverId);
      }
      const messageData = await this.iChatRepository.createMessage(
        senderId,
        receiverId,
        message
      );
      return {
        status: true,
        statusCode: 200,
        message: "Message sent Successfully",
        ...messageData,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async getMessages(
    senderId: string,
    receiverId: string
  ): Promise<ResponseType> {
    try {
      const result = await this.iChatRepository.getMessages(
        senderId,
        receiverId
      );
      console.log("this is chat use case get message");
      return {
        status: true,
        statusCode: 200,
        message: "Here are the messages",
        ...result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
}

export default ChatUseCase;
