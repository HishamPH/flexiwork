import mongoose from "mongoose";

interface Notification {
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export default Notification;
