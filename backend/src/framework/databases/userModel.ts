import mongoose,{Document,Model,Schema} from "mongoose";

import bcrypt from 'bcryptjs';

export interface IUser {
  _id:string,
  name:string,
  email:string,
  password:string,
  role:string,
  isBlocked:boolean,
  profilePic:string,
  location:string,
  contact:number,
  about:string
}

const userSchema : Schema<IUser> = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true
  },
  isBlocked:{
    type:Boolean,
    default:false
  },
  profilePic:{
    type:String,
    default:'user.png'
  },
  location:{
    type:String,
    default:''
  },
  contact:{
    type:Number,
  },
  about:{
    type:String,
    default:''
  }
})

userSchema.pre<IUser>('save',async function (next){
  this.password = await bcrypt.hash(this.password,10);
  next();
});
userSchema.index({ name: 'text' });

const userModel: Model<IUser> = mongoose.model('User', userSchema)

export default userModel