import mongoose, { Document, Model, Schema } from "mongoose";

interface IInterview {
  recruiterId: string;
  date: string;
  start: string;
  duration: Number;
  to: string;
  remarks?: string;
}

export interface IApplication {
  _id: string;
  candidateId: mongoose.Types.ObjectId;
  resume: string;
  status: string;
  jobId: mongoose.Types.ObjectId;
  interview?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema: Schema<IApplication> = new mongoose.Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Applied",
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    interview: {
      type: Schema.Types.ObjectId,
      ref: "Interview",
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const applicationModel: Model<IApplication> = mongoose.model(
  "Application",
  applicationSchema
);

export default applicationModel;
