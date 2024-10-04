import mongoose, { Document, Model, Schema } from "mongoose";
import Notification from "../../entity/notificationEntity";

// interface INotification extends Document {
//   _id: mongoose.Types.ObjectId;
//   senderId: mongoose.Types.ObjectId;
//   receiverId: mongoose.Types.ObjectId;
//   notification: string;
//   updatedAt?: Date;
//   createdAt?: Date;
// }

const notificationSchema: Schema<Notification> = new mongoose.Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
  },
  { capped: 10, timestamps: true }
);

const notificationModel: Model<Notification> = mongoose.model(
  "Notification",
  notificationSchema
);

export default notificationModel;
