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
      const user = await userModel.findById(userId).select("-password -__v");
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async upgradeUser(userId: string, paymentId: string): Promise<User | null> {
    try {
      const now = new Date();
      const futureDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 28,
        0,
        0,
        0
      );
      const user = await userModel
        .findByIdAndUpdate(
          userId,
          {
            isPro: true,
            proExpiry: futureDate,
            $push: {
              paymentDetails: {
                paymentId: paymentId,
                amount: 999,
                date: now,
              },
            },
          },
          { new: true }
        )
        .select("-password -__v -isBlocked")
        .lean();
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async degradeUser(userId: string): Promise<User | null> {
    try {
      const user = await userModel
        .findByIdAndUpdate(
          userId,
          {
            isPro: false,
            proExpiry: null,
          },
          { new: true }
        )
        .select("-password -__v -isBlocked")
        .lean();
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
