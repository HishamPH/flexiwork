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

  async sendMessage(message: Message): Promise<ResponseType> {
    try {
      const result = await this.iChatRepository.sendMessage(message);
      return {
        status: true,
        statusCode: 200,
        message: "Message sent Successfully",
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
