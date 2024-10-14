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

  async getSummary(filter: string): Promise<any> {
    try {
      let matchStage = {};
      let groupStage = {};
      const now = new Date();

      switch (filter) {
        case "week":
          const weekEnd = new Date(); // Today
          const weekStart = new Date();
          weekStart.setDate(weekEnd.getDate() - 6); // Start date is 6 days before today, making a total of 7 days

          matchStage = {
            "paymentDetails.date": { $gte: weekStart, $lte: weekEnd },
          };
          groupStage = {
            _id: {
              year: { $year: "$paymentDetails.date" },
              month: { $month: "$paymentDetails.date" },
              day: { $dayOfMonth: "$paymentDetails.date" },
            },
            totalAmount: { $sum: "$paymentDetails.amount" },
          };
          break;

        case "month":
          const till = new Date();
          const monthStart = new Date(till);
          monthStart.setDate(till.getDate() - 30);
          matchStage = { "paymentDetails.date": { $gte: monthStart } };
          groupStage = {
            _id: {
              day: { $dayOfMonth: "$paymentDetails.date" },
              month: { $month: "$paymentDetails.date" },
              year: { $year: "$paymentDetails.date" },
            },
            totalAmount: { $sum: "$paymentDetails.amount" },
          };
          break;
        case "year":
          const yearStart = new Date(now.getFullYear(), 0, 1);
          matchStage = { "paymentDetails.date": { $gte: yearStart } };
          groupStage = {
            _id: { month: { $month: "$paymentDetails.date" } },
            totalAmount: { $sum: "$paymentDetails.amount" },
          };
          break;
        default:
          return null;
      }
      const result = await userModel.aggregate([
        { $unwind: "$paymentDetails" },
        { $match: matchStage },
        { $group: groupStage },
        { $sort: { _id: 1 } },
        //{ $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
      ]);

      const totalRecruiters = await userModel.countDocuments({
        role: "recruiter",
      });
      const totalCandidates = await userModel.countDocuments({
        role: "candidate",
      });
      return { result, totalCandidates, totalRecruiters };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default AdminRepository;
