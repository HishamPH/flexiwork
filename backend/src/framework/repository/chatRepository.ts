import Chat from "../../entity/chatEntity";
import Message from "../../entity/messageEntity";
import Notification from "../../entity/notificationEntity";
import IChatRepsoitory from "../../usecases/interfaces/IChatRepository";
import chatModel from "../databases/chatModel";
import messageModel from "../databases/messageModel";
import notificationModel from "../databases/notificationModel";

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
  ): Promise<Message | null> {
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
        .populate("messages")
        .populate({
          path: "participants",
          match: { _id: receiverId },
          select: "-password -__v", // Exclude the password field
        })
        .exec();
      if (!chat) {
        const newChat = await chatModel.create({
          participants: [senderId, receiverId],
        });
        return newChat.toObject();
      } else return chat.toObject();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getConversations(senderId: string): Promise<Chat[] | null> {
    try {
      const chats = await chatModel
        .find({ participants: senderId })
        .sort({ updatedAt: -1 })
        .select("-messages -__v")
        .populate({
          path: "participants",
          select: "-password -__v",
        })
        .lean()
        .exec();
      return chats;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async createNotification(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<{} | null> {
    try {
      const notification = await notificationModel.create({
        senderId,
        receiverId,
        message,
      });

      const populatedNotification = await notificationModel
        .findById(notification._id)
        .populate("senderId");

      return populatedNotification;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getNotifications(userId: string): Promise<Notification[] | null> {
    try {
      const notifications = await notificationModel
        .find({ receiverId: userId })
        .sort({ updatedAt: -1 })
        .populate("senderId")
        .select("-__v");

      return notifications;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async deleteNotification(notificationId: string): Promise<any | null> {
    try {
      await notificationModel.findByIdAndDelete(notificationId);
      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async clearNotifications(receiverId: string): Promise<any | null> {
    try {
      await notificationModel.deleteMany({ receiverId: receiverId });
      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
