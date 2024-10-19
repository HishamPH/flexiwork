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
  async findUser(id: string): Promise<User | null> {
    try {
      const user = (await userModel
        .findById(id)
        .select(
          "-password -__v -isBlocked -paymentDetails -createdAt -updatedAt"
        )
        .lean()) as User;
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async isBlocked(userId: string): Promise<User | null> {
    try {
      const user = await userModel
        .findById(userId)
        .select("-password -__v -paymentDetails -createdAt -updatedAt");
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async upgradeUser(userId: string, paymentId: string): Promise<User | null> {
    try {
      const now = new Date();

      // const futureDate = new Date(
      //   now.getFullYear(),
      //   now.getMonth(),
      //   now.getDate() + 1,
      //   0,
      //   0,
      //   0
      //);

      const futureDate = new Date(now.getTime() + 100 * 60 * 1000);
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
        .select(
          "-password -__v -isBlocked -paymentDetails -createdAt -updatedAt"
        )
        .lean();
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async demoteUser(userId: string): Promise<User | null> {
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
        .select(
          "-password -__v -isBlocked -paymentDetails -createdAt -updatedAt"
        )
        .lean();
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateProStatus(): Promise<any> {
    console.log(new Date(Date.now()), "thw whole thing is awesome");
    try {
      const now = Date.now();
      let updatedUsers = await userModel
        .find({ proExpiry: { $lte: now }, isPro: true })
        .select("_id");

      const updatedIds = updatedUsers.map((user) => user._id);
      await userModel.updateMany(
        { _id: { $in: updatedIds } },
        { $set: { isPro: false, proExpiry: null } }
      );
      let users = await userModel
        .find({ _id: { $in: updatedIds } })
        .select("-password -__v -paymentDetails -createdAt -updatedAt");
      return users;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
