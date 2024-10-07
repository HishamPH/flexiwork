import React, { useState, useEffect, memo } from "react";

import { Dialog } from "@material-tailwind/react";

import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/userAuth";
import { Failed, Success } from "../helper/popup";
import axiosInstance from "../../interceptors/axiosInterceptors";

import { jwtDecode } from "jwt-decode";

import { storeOTP } from "../redux/slices/userAuth";

function getRemainingTime(token) {
  if (!token) return 0;
  const decoded = jwtDecode(token);
  if (!decoded.exp) return 0;
  const currentTime = Math.floor(Date.now() / 1000);
  const remainingTime = decoded.exp - currentTime;
  return remainingTime > 0 ? remainingTime : 0;
}

const OTPInput = memo(({ open, setOpen }) => {
  const { otpToken } = useSelector((state) => state.user);
  const time = getRemainingTime(otpToken);
  console.log(time);
  const [otp, setOtp] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(90);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let countdown;
    if (time > 0) {
      setCanResend(false);
      countdown = setInterval(() => {
        setTimer(time - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(countdown);
  }, [timer, otpToken]);

  const handleResendOTP = async () => {
    try {
      const decoded = jwtDecode(otpToken);
      setCanResend(false);
      setLoading(true);
      const res = await axiosInstance.post(
        "/user/resend-otp",
        { user: decoded.user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await dispatch(storeOTP(res.data.activationToken));
      setLoading(false);
      setTimer(getRemainingTime(res.data.activationToken));
      Success(res.data.message);
    } catch (err) {
      setCanResend(true);
      setTimer(0);
      Failed(err.response ? err.response.data.message : err.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post(
        "/user/register-user",
        { otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res?.status === 200) {
        setOpen(false);
        let data = res.data.result;
        dispatch(setUser(res.data.result));
        if (data.role === "candidate") navigate("/candidate/home");
        else navigate("/recruiter/home");
      }
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleCancel = async () => {
    try {
      dispatch(storeOTP(null));
      setTimer(90);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!otpToken) return null;

  return (
    <Dialog open={open} size="xs">
      {/* Modal */}
      <div className=" bg-white p-8 rounded-xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Enter OTP
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter the 6-digit code sent to your device
        </p>
        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-2">-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              border: "2px solid #cbd5e1",
              borderRadius: "8px",
              width: "36px",
              height: "54px",
              fontSize: "24px",
              color: "#1e293b",
              fontWeight: "700",
              caretColor: "#3b82f6",
            }}
            focusStyle={{
              border: "2px solid #3b82f6",
              outline: "none",
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-8 font-semibold hover:bg-blue-700 transition duration-300"
        >
          Verify OTP
        </button>

        <div className="flex justify-between mt-4">
          <button onClick={handleCancel} className="text-blue-700 underline">
            Cancel
          </button>
          <div className="flex items-center space-x-2">
            {canResend ? (
              <button
                onClick={handleResendOTP}
                className="text-blue-700 underline"
              >
                Resend OTP
              </button>
            ) : loading ? (
              <div>resending...</div>
            ) : (
              <span className="text-gray-600">
                Resend in {formatTime(timer)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
});

export default OTPInput;
