import mongoose, { Document, Model, Schema } from "mongoose";

export interface IInterview {
  _id: mongoose.Types.ObjectId;
  recruiter: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
  start: string | Date;
  to: string | Date;
  remarks?: string;
}

const interviewSchema: Schema<IInterview> = new mongoose.Schema(
  {
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    candidate: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    start: { type: Date, required: true },
    to: { type: Date, required: true },
    remarks: { type: String, required: false },
  },
  { timestamps: true }
);

const interviewModel: Model<IInterview> = mongoose.model(
  "Interview",
  interviewSchema
);

export default interviewModel;
