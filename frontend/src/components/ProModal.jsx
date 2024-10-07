import { X, Check } from "lucide-react";

import React, { memo } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import handlePayment from "../hooks/payment";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/slices/modalSlice";

const ProModal = ({ navigate }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const features = [
    "Unlimited projects",
    "Priority support",
    "Advanced analytics",
    "Custom branding",
    "Team collaboration",
  ];

  const handleUpgrade = async () => {
    const payment = await handlePayment(userInfo, navigate, dispatch);
    dispatch(closeModal());
    console.log(payment);
  };

  const handleOpen = () => {
    console.log("ehllo");
    dispatch(closeModal());
  };

  return (
    <>
      <Dialog
        open={isOpen}
        handler={handleOpen}
        className="rounded-none"
        size="md"
      >
        <div className="bg-white rounded-none shadow-xl w-full overflow-hidden ">
          <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4">
            <h3 className="text-2xl font-bold">Upgrade to Pro</h3>
            <p className="mt-1 text-purple-100">
              Unlock premium features today!
            </p>
            <div className="absolute top-4 right-4">
              <button
                className="text-purple-100 hover:text-white"
                onClick={handleOpen}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="mb-4">
              <span className="text-4xl font-bold text-black">₹999</span>
              <span className="text-gray-600">/month</span>
            </div>

            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check size={20} className="text-green-500 mr-2" />
                  <span className="text-black">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 py-4 bg-gray-50">
            <button
              onClick={handleUpgrade}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProModal;
