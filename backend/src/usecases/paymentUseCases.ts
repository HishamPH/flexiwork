import User from "../entity/userEntity";
import IUserRepository from "./interfaces/IUserRepository";
import IPayment from "./interfaces/IPayment";

interface ResponseType {
  _id?: string;
  result?: User | {};
  status?: boolean;
  statusCode: number;
  message?: string;
  activationToken?: string;
  accessToken?: string;
  refreshToken?: string;
  authToken?: string;
}

class PaymentUseCase {
  private iUserRepository: IUserRepository;
  private iPayment: IPayment;
  constructor(iUserRepository: IUserRepository, iPayment: IPayment) {
    this.iUserRepository = iUserRepository;
    this.iPayment = iPayment;
  }

  async updateUserRequest(amount: number): Promise<any> {
    try {
      const order = await this.iPayment.createOrder(amount);
      return {
        status: true,
        statusCode: 200,
        message: "order created successfully",
        order,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async verifyPayment(
    userId: string,
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ): Promise<any> {
    try {
      const result = await this.iPayment.verifyPayment(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
      if (result.success && result.statusCode === 200) {
        const user = await this.iUserRepository.upgradeUser(
          userId,
          razorpay_payment_id
        );
        return {
          status: true,
          ...result,
          user,
        };
      }
      return {
        status: true,
        ...result,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
}

export default PaymentUseCase;
