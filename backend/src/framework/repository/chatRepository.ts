import Chat from "../../entity/chatEntity";
import Message from "../../entity/messageEntity";
import IChatRepsoitory from "../../usecases/interfaces/IChatRepository";
import chatModel from "../databases/chatModel";
import messageModel from "../databases/messageModel";

export default class ChatRepository implements IChatRepsoitory {
  async findChat(senderId: string, receiverId: string): Promise<{} | null> {
    try {
      const chat = await chatModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      if (chat) return chat.toObject();
      else return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async createChat(senderId: string, receiverId: string): Promise<{} | null> {
    try {
      const chat = await chatModel.create({
        participants: [senderId, receiverId],
      });
      return chat.toObject();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async createMessage(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<{} | null> {
    try {
      const newMessage = await messageModel.create({
        senderId,
        receiverId,
        message,
      });

      const chat = await chatModel.findOneAndUpdate(
        { participants: { $all: [senderId, receiverId] } },
        { $push: { messages: newMessage._id } },
        { new: true, upsert: true } // Create the chat if it doesn't exist
      );

      return newMessage.toObject();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getMessages(senderId: string, receiverId: string): Promise<{} | null> {
    try {
      const chat = await chatModel
        .findOne({
          participants: { $all: [senderId, receiverId] },
        })
        .populate("messages");

      if (chat) return chat.toObject();
      else return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
