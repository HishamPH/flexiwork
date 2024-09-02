import mongoose,{Document,Model,Schema} from "mongoose";


export interface IApplication{
  _id:string
  candidateId:mongoose.Types.ObjectId
  resume:string
  status:string
  jobId:mongoose.Types.ObjectId
  
}


const applicationSchema:Schema<IApplication> = new mongoose.Schema({
  candidateId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  resume:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:'Applied'
  },
  jobId:{
    type:Schema.Types.ObjectId,
    ref:'Job',
    required:true
  }
});


const applicationModel:Model<IApplication> = mongoose.model('Application',applicationSchema)

export default applicationModel;








