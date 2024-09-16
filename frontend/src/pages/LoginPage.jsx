import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../validations/validation";

import { useFormik } from "formik";
import axios from "axios";
import { Success, Failed } from "../helper/popup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userAuth";
import { Button } from "@material-tailwind/react";

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
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
      const { ...rest } = values;
      rest.role = selectedRole;
      try {
        const res = await axios.post("/api/user/signin", rest, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.data;
        dispatch(setUser(res.data));
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg max-w-md w-full">
        {/* Role Selection Buttons */}
        <div className="flex rounded-md shadow-sm justify-center">
          <Button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-sm ${
              selectedRole === "candidate"
                ? "bg-blue-400 text-black"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-200`}
            onClick={() => setSelectedRole("candidate")}
          >
            Candidate
          </Button>
          <Button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              selectedRole === "recruiter"
                ? "bg-blue-400 text-black"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-200`}
            onClick={() => setSelectedRole("recruiter")}
          >
            Recruiter
          </Button>
        </div>
        {/* Role Selection Buttons */}

        {/* Login Form */}
        <h2 className="text-2xl font-semibold text-center my-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && touched.password ? (
              <div className="text-red-700">{errors.password}</div>
            ) : null}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-500 text-white py-3 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <GoogleLogin
          // onSuccess={handleLogin}
          className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Login with Google
        </GoogleLogin>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
