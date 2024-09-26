import User from "../../entity/userEntity";
import IUserRepository from "../../usecases/interfaces/IUserRepository";
import userModel, { IUser } from "../databases/userModel";

import { ObjectId } from "mongodb";

export default class UserRepository implements IUserRepository {
  async updateUser(user: User): Promise<{} | null> {
    try {
      let {
        _id,
        name,
        contact,
        location,
        about,
        profilePic,
        education,
        workExperience,
      } = user;

      if (!education) {
        education = [];
      }
      const updatedUser = await userModel
        .findByIdAndUpdate(
          { _id },
          {
            name,
            contact,
            location,
            about,
            profilePic,
            education,
            workExperience,
          },
          { new: true }
        )
        .select("-password -__v")
        .lean();
      return updatedUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async findUser(id: string): Promise<{} | null> {
    try {
      const user = (await userModel
        .findById(id)
        .select("-password -__v")
        .lean()) as User;
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async isBlocked(userId: string): Promise<User | null> {
    try {
      const user = await userModel.findById(userId);
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
