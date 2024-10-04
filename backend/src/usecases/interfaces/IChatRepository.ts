import Chat from "../../entity/chatEntity";
import Message from "../../entity/messageEntity";
import Notification from "../../entity/notificationEntity";

interface IChatRepsoitory {
  findChat(senderId: string, receiverId: string): Promise<{} | null>;
  createChat(senderId: string, receiverId: string): Promise<{} | null>;
  createMessage(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<{} | null>;
  createNotification(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<{} | null>;
  getMessages(senderId: string, receiverId: string): Promise<{} | null>;
  getConversations(senderId: string): Promise<Chat[] | null>;
  getNotifications(userId: string): Promise<Notification[] | null>;
  deleteNotification(notificationId: string): Promise<any | null>;
  clearNotifications(receiverId: string): Promise<any | null>;
}
export default IChatRepsoitory;
