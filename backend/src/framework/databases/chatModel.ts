import mongoose, { Document, Model, Schema } from "mongoose";

export interface IChat {
  _id: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const chatSchema: Schema<IChat> = new mongoose.Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const chatModel: Model<IChat> = mongoose.model("Chat", chatSchema);

export default chatModel;
