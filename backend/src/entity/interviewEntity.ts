import mongoose from "mongoose";

interface Interview {
  _id: mongoose.Types.ObjectId;
  recruiter: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
  start: string | Date;
  to: string | Date;
  remarks?: string;
}

export default Interview;
