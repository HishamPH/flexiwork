import User from "../../entity/userEntity";
import IUserRepository from "../../usecases/interfaces/IUserRepository";
import userModel,{IUser} from "../databases/userModel";

import { ObjectId } from "mongodb";

export default class UserRepository implements IUserRepository{
    async updateUser(user: User): Promise<{} | null> {
        try {
            const {_id,name,contact,location,about}=user;
            const updatedUser = await userModel.findByIdAndUpdate({_id},{
                name,contact,location,about
            },{new:true}).select('-password -__v').lean();
            return updatedUser;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    async findUser(id: string): Promise<{} | null> {
        try {
            const user = (await userModel.findById(id).select('-password -__v').lean()) as User;
            return user;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}











