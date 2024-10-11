import crypto from "crypto";
import Razorpay from "razorpay";
import IPayment from "../../usecases/interfaces/IPayment";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "your-secret-key",
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default class Payment implements IPayment {
  async createOrder(amount: number): Promise<any> {
    try {
      const currency = "INR";
      const options = {
        amount: amount * 100, // Razorpay requires amount in paise
        currency,
        receipt: `receipt_${Date.now()}`,
      };
      const order = await razorpay.orders.create(options);
      return order;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ): Promise<any> {
    try {
      const secret = process.env.RAZORPAY_KEY_SECRET || "your-secret-key";
      console.log("the secret is ", secret);
      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature === razorpay_signature) {
        return {
          statusCode: 200,
          success: true,
          message: "Payment verified successfully",
        };
      } else {
        return {
          statusCode: 400,
          success: false,
          message: "Payment verification failed",
        };
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
