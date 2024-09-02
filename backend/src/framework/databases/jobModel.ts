import mongoose,{Document,Model,Schema} from "mongoose";

import bcrypt from 'bcryptjs';

export interface IJob {
  _id:string
  recruiterId:mongoose.Types.ObjectId
  jobName:string,
  description:string,
  responsibilities:string
  niceToHaves:string
  postDate:Date,
  dueDate:Date
  jobType:string
  minSalary:number
  maxSalary:number
  skills:string
  location:string,
  applicants:mongoose.Types.ObjectId[]
  remote:boolean
}

const jobSchema : Schema<IJob> = new mongoose.Schema({
  jobName:{
    type:String
  },
  description:{
    type:String
  },
  responsibilities:{
    type:String
  },
  niceToHaves:{
    type:String
  },
  postDate:{
    type:Date
  },
  dueDate:{
    type:Date
  },
  jobType:{
    type:String
  },
  minSalary:{
    type:Number
  },
  maxSalary:{
    type:Number
  },
  skills:{
    type:String
  },
  location:{
    type:String
  },
  applicants:{
    type:[Schema.Types.ObjectId],
    ref:'User'
  },
  recruiterId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  remote:{
    type:Boolean,
    default:false
  }
})


jobSchema.index({ jobName: 'text' });

const jobModel: Model<IJob> = mongoose.model('Job', jobSchema)

export default jobModel