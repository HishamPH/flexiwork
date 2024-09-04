import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userAuth';
import { Failed } from '../helper/popup';

const OTPInput = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // 120 seconds timer
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(countdown);
      setCanResend(true); // Allow resend after timer ends
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleResendOTP = async () => {
    try {
      await axios.post("/api/user/resend-otp");
      setTimer(120); // Reset the timer to 120 seconds
      setCanResend(false);
    } catch (err) {
      Failed("Failed to resend OTP");
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/user/register-user", { otp }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.status === 200) {
        let data = res.data;
        dispatch(setUser(res.data));
        if(data.role==='candidate')
          navigate('/candidate/home');
        else
          navigate('/recruiter/home');
        onClose();
      }
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop:blur-lg"></div>
      
      {/* Modal */}
      <div className="relative bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Enter OTP</h2>
        <p className="text-center text-gray-600 mb-6">Please enter the 6-digit code sent to your device</p>
        
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
        
        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-8 font-semibold hover:bg-blue-700 transition duration-300"
        >
          Verify OTP
        </button>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="text-blue-700 underline">Cancel</button>
          <div className="flex items-center space-x-2">
            {canResend ? (
              <button onClick={handleResendOTP} className="text-blue-700 underline">Resend OTP</button>
            ) : (
              <span className="text-gray-600">Resend in {formatTime(timer)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;