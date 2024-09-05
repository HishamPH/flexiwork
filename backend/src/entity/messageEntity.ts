import mongoose from "mongoose";

interface Message {
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  sentAt?: Date;
  updatedAt?: Date;
}

export default Message;
