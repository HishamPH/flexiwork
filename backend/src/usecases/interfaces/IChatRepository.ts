import Chat from "../../entity/chatEntity";
import Message from "../../entity/messageEntity";

interface IChatRepsoitory {
  findChat(senderId: string, receiverId: string): Promise<{} | null>;
  createChat(senderId: string, receiverId: string): Promise<{} | null>;
  createMessage(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<{} | null>;
  getMessages(senderId: string, receiverId: string): Promise<{} | null>;
  getConversations(senderId: string): Promise<Chat[] | null>;
}
export default IChatRepsoitory;
