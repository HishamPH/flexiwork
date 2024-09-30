import axiosInstance from "../../interceptors/axiosInterceptors";
import { setUser } from "../redux/slices/userAuth";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handlePayment = async (userInfo, navigate, dispatch) => {
  const scriptLoaded = await loadRazorpayScript();

  if (!scriptLoaded) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }
  const orderResponse = await axiosInstance.post("/user/upgrade-request", {
    amount: 999, // Amount in INR
  });

  const { id: order_id, amount, currency } = orderResponse.data.order;
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY_ID",
    amount: amount.toString(),
    currency,
    name: "FlexiWork",
    description: "Upgrade to Pro",
    order_id,
    handler: async function (response) {
      const paymentData = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };
      const verifyResponse = await axiosInstance.post(
        "/user/upgrade-verification",
        paymentData
      );
      const user = verifyResponse.data.user;
      await dispatch(setUser({ ...userInfo, ...user }));
      navigate(`/${userInfo.role}/home`);
      return verifyResponse.data;
    },
    prefill: {
      name: userInfo.name,
      email: userInfo.email,
      contact: userInfo.contact || "9898989898",
    },
    theme: {
      color: "#61dafb",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  paymentObject.on("payment.failed", () => {
    return false;
  });
};

export default handlePayment;
