import React, { useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
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
import { Success, Failed } from "../helper/popup";
import { useDispatch } from "react-redux";
import { setUser, storeOTP } from "../redux/slices/userAuth";
import OTPInput from "../components/OTPInput";
import axiosInstance from "../../interceptors/axiosInterceptors";

const initialValues = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState("candidate");
  const [open, setOpen] = useState(false);

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
      //await delay(3000);
      const { ...rest } = values;
      rest.role = selectedRole;
      try {
        const res = await axiosInstance.post("/user/signup", rest, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        await dispatch(storeOTP(res.data.activationToken));
        action.resetForm();
        setOpen(true);
        Success(res.data.message);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      } finally {
        action.setSubmitting(false);
      }
    },
  });

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    console.log(role);
  };

  const handleGoogleSuccess = async (item) => {
    try {
      const res = await axiosInstance.post(
        "/user/google/auth",
        { credential: item.credential, role: selectedRole },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res?.status === 200) {
        let data = res.data.result;
        dispatch(setUser(data));
        if (data.role === "candidate") navigate("/candidate/home");
        else navigate("/recruiter/home");
      }
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };
  const handleGoogleError = async () => {};

  return (
    <>
      <div className="flex justify-center min-h-screen h-2/3 w-full bg-gray-100">
        <div className=" flex w-2/3 h-[653px] my-10 shadow-lg">
          <div
            className=" w-full h-full pe-32"
            style={{
              backgroundColor: "#1e293b",
            }}
          >
            <Link to={"/"} className="flex items-center mt-7 ms-7">
              <div className="w-12 h-12 bg-indigo-600 rounded-full mr-2"></div>
              <span className="text-2xl font-bold text-white">FlexiWork</span>
            </Link>
          </div>
          <div className="bg-white w-full p-8 h-full">
            {/* Role Selection Dropdown */}

            {/* Login Form */}
            <h2 className="text-2xl font-semibold text-center mb-6">
              Register
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-0">
                {/* <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label> */}
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                  className="mt-0 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.name && touched.name ? (
                  <div className="text-red-700 text-sm">{errors.name}</div>
                ) : (
                  <div className="text-white text-sm">l</div>
                )}
              </div>
              <div className="mb-0">
                {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label> */}
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className="mt-0 block w-full p-3 border border-gray-300 rounded-md shadow-sm "
                />
                {errors.email && touched.email ? (
                  <div className="text-red-700 text-sm">{errors.email}</div>
                ) : (
                  <div className="text-white text-sm">Hello</div>
                )}
              </div>

              <div className="mb-0">
                {/* <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label> */}
                <input
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  className="mt-0 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-700 text-sm">{errors.password}</div>
                ) : (
                  <div className="text-white text-sm">l</div>
                )}
              </div>
              <div className="mb-0">
                {/* <label
                htmlFor="password2"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label> */}
                <input
                  id="password2"
                  type="password"
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  className="mt-0 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.password2 && touched.password2 ? (
                  <div className="text-red-700 text-sm">{errors.password2}</div>
                ) : (
                  <div className="text-white text-sm">l</div>
                )}
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
                    <MenuItems className="absolute w-auto origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
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
              {isSubmitting ? (
                <Button
                  type="submit"
                  className="w-full bg-indigo-700 text-white py-3 shadow-md hover:bg-indigo-500 rounded-sm"
                  disabled
                >
                  registering...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-indigo-700 text-white py-3 shadow-md hover:bg-indigo-500 rounded-sm"
                >
                  Sign Up
                </Button>
              )}
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <GoogleLogin
              //clientId={clientId}
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <OTPInput open={open} setOpen={setOpen} />
    </>
  );
};

export default SignUp;
