import { Request, Response, NextFunction } from "express";
import UserUseCase from "../usecases/userUseCases";
import PaymentUseCase from "../usecases/paymentUseCases";

class UserController {
  private userCase: UserUseCase;
  private paymentCase: PaymentUseCase;
  constructor(userCase: UserUseCase, paymentCase: PaymentUseCase) {
    this.userCase = userCase;
    this.paymentCase = paymentCase;
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
      const order = await this.paymentCase.updateUserRequest(amount);
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
      const result = await this.paymentCase.verifyPayment(
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
