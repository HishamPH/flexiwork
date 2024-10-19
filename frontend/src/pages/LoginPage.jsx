import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../validations/validation";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { useFormik } from "formik";
import { Success, Failed } from "../helper/popup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userAuth";
import { Button, Input, Tooltip } from "@material-tailwind/react";
import axiosInstance from "../../interceptors/axiosInterceptors";

const initialValues = {
  email: "",
  password: "",
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [selectedRole, setSelectedRole] = useState("candidate");
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
    validationSchema: loginValidation,
    onSubmit: async (values, action) => {
      await delay(3000);
      const { ...rest } = values;
      rest.role = selectedRole;
      try {
        const res = await axiosInstance.post("/user/signin", rest, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.data;
        dispatch(setUser(res.data.result));
        action.resetForm();
        Success(data.message);
        if (data.role === "candidate") navigate("/candidate/home");
        else navigate("/recruiter/home");
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      } finally {
        action.resetForm();
        action.setSubmitting(false);
      }
    },
  });

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

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-lg max-w-md w-full">
          {/* Role Selection Buttons */}
          <div className="flex rounded-md justify-center">
            <div className="bg-gray-400 p-[3px] shadow-lg">
              <Button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-sm ${
                  selectedRole === "candidate"
                    ? "bg-indigo-700 hover:bg-indigo-400 text-white font-bold"
                    : "bg-white text-black hover:bg-gray-300"
                } border border-gray-200`}
                onClick={() => setSelectedRole("candidate")}
              >
                Candidate
              </Button>
              <Button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-sm ${
                  selectedRole === "recruiter"
                    ? "bg-indigo-700 hover:bg-indigo-400 text-white font-bold"
                    : "bg-white text-black hover:bg-gray-300"
                } border border-gray-200`}
                onClick={() => setSelectedRole("recruiter")}
              >
                Recruiter
              </Button>
            </div>
          </div>
          {/* Role Selection Buttons */}

          {/* Login Form */}
          <h2 className="text-2xl font-semibold text-center my-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-0">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && touched.email ? (
                <div className="text-red-700">{errors.email}</div>
              ) : (
                <div className="text-white">i</div>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && touched.password ? (
                <div className="text-red-700">{errors.password}</div>
              ) : (
                <div className="text-white">i</div>
              )}
            </div>

            {isSubmitting ? (
              <Button
                type="submit"
                className="w-full bg-indigo-700 text-white py-3 shadow-md hover:bg-indigo-500 rounded-sm"
                disabled
              >
                Loggin in...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-indigo-700 text-white py-3 shadow-md hover:bg-indigo-500 rounded-sm"
              >
                Login
              </Button>
            )}
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
