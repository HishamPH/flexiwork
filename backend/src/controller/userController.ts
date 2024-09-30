import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import Razorpay from "razorpay";

import UserUseCase from "../usecases/userUseCases";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "your secret key",
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class UserController {
  private userCase: UserUseCase;
  constructor(userCase: UserUseCase) {
    this.userCase = userCase;
  }
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { ...userData } = req.body;
      if (req.file) {
        userData.profilePic = req.file.filename;
      }
      const user = await this.userCase.updateProfile(userData);
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userCase.getUser(id);
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async upgradeUserRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount } = req.body;
      const order = await this.userCase.updateUserRequest(amount);
      return res.status(order?.statusCode).json({ ...order });
    } catch (err) {
      console.log("userController line no. 55");
      next(err);
    }
  }

  async verifyPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const { id } = req.user;
      const result = await this.userCase.verifyPayment(
        id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
      return res.status(result?.statusCode).json({ ...result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default UserController;
