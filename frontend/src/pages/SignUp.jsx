import React, { useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  MenuItems,
  MenuItem,
  Transition,
  Menu,
  MenuButton,
} from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupValidation } from "../validations/validation";

import { useFormik } from "formik";
import axios from "axios";
import { Success, Failed } from "../helper/popup";
import { useDispatch, useSelector } from "react-redux";
import { storeOTP } from "../redux/slices/userAuth";
import OTPInput from "../components/OTPInput";
import axiosInstance from "../../interceptors/axiosInterceptors";

const initialValues = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const SignUp = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleChange,
    values,
    errors,
    handleSubmit,
    handleBlur,
    touched,
    isSubmitting,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: signupValidation,
    onSubmit: async (values, action) => {
      const { ...rest } = values;
      rest.role = selectedRole;
      try {
        const res = await axiosInstance.post("/user/signup", rest, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(storeOTP(res.data.activationToken));
        console.log(res.data);
        action.resetForm();
        Success(res.data.message);
        setIsOpen(true);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      } finally {
        action.setSubmitting(false);
      }
    },
  });

  // console.log(setValues);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    console.log(role);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: () => {
      console.log("hello");
    },
    onError: () => {
      console.log("very disappointing");
    },
  });

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-lg max-w-md w-full">
          {/* Role Selection Dropdown */}

          {/* Login Form */}
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your name"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.name && touched.name ? (
                <div className="text-red-700">{errors.name}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm "
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password2"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="password2"
                type="password"
                value={values.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <Menu as="div" className="relative">
                <MenuButton
                  className="flex items-center justify-between p-3 bg-blue-gray-600 rounded-lg cursor-pointer border border-gray-300 shadow-sm"
                  type="button"
                >
                  <span className="text-white">{selectedRole}</span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                </MenuButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute w-auto origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          type="button"
                          onClick={() => handleRoleChange("candidate")}
                          className={`block px-4 py-2 text-lg w-full text-left ${
                            focus
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          candidate
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          type="button"
                          onClick={() => handleRoleChange("recruiter")}
                          className={`block px-4 py-2 text-lg w-full text-left ${
                            focus
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          recruiter
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
            {errors.terms && touched.terms ? (
              <p className=" relative bottom-3 ml-0 text-left  text-xs text-rose-600 ">
                {errors.terms}
              </p>
            ) : null}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <GoogleLogin
            clientId={clientId}
            onClick={() => {
              console.log("hello");
            }}
          />

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <OTPInput isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default SignUp;
