import IAdminRepository from "../../usecases/interfaces/IAdminRepository";

import adminModel from "../databases/adminModel";

import Admin from "../../entity/adminEntity";

import bcrypt from "bcryptjs";

import User from "../../entity/userEntity";

import userModel, { IUser } from "../databases/userModel";

class AdminRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<Admin | null> {
    return adminModel.findOne({ email });
  }

  async loginAdmin(password: string, hash: string): Promise<boolean> {
    try {
      return bcrypt.compare(password, hash);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getCandidates(): Promise<{ users: User[] } | null> {
    try {
      const users = await userModel
        .find({ role: "candidate" })
        .select("-password -__v");
      return { users: users };
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getRecruiters(): Promise<{ users: User[] } | null> {
    try {
      const users = await userModel
        .find({ role: "recruiter" })
        .select("-password -__v");
      return { users: users };
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async blockUser(userId: string, action: string): Promise<boolean> {
    try {
      if (action === "block") {
        const blocked = await userModel.findByIdAndUpdate(
          userId,
          { $set: { isBlocked: true } },
          { new: true }
        );

        return true;
      } else if (action === "unblock") {
        const unblocked = await userModel.findByIdAndUpdate(
          userId,
          { $set: { isBlocked: false } },
          { new: true }
        );

        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default AdminRepository;
