import User from "../../entity/userEntity";
import IAuthRepository from "../../usecases/interfaces/IAuthRepository";

import userModel,{IUser} from "../databases/userModel";

import bcrypt from 'bcryptjs';

import { ObjectId } from "mongodb";



export default class AuthRepository implements IAuthRepository{
  async findByEmailAndUserId(id: string, email: string): Promise<User | null> {
    try {
      const user = (await userModel.findOne(
        {_id:new ObjectId(id),email:email},
        {
          _id:1,
          email:1,
          name:1
        }
      )) as User
      if(user){
        return user;
      }else{
        return null;
      }
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = (await userModel.findOne({email})) as User;
    if(user)
      return user;
    else
      return null;
  }

  async findUserById(id: string): Promise<User | null> {
    return await userModel.findById(id).select('-password');
  }

  async createUser(user: User): Promise<{} | null> {
    try {
      const {name,email,password,role} = user;

      const savedUser = await userModel.create({
        name,email,password,role
      });
      if(savedUser){
        const {
          name,
          email,
          role
        } = savedUser

        return {name,email,role};
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async loginUser(hashPass: string, password: string): Promise<boolean> {
    return bcrypt.compare(password,hashPass)
  }
}