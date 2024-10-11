interface IPayment {
  createOrder(amount: number): Promise<any>;
  verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ): Promise<any>;
}

export default IPayment;
