import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate,Link } from 'react-router-dom';
import { useFormik } from "formik";
import axios from "axios";
import { loginValidation } from "../../validations/validation";
import { Success,Failed } from "../../helper/popup";
import { useDispatch,useSelector } from 'react-redux';
const initialValues = {
  email:'',
  password:''
}

function AdminLogin() {
  const [passwordShown, setPasswordShown] = useState(false);
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
    setValues
  } = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: async (values, action) => {
      const {...rest } = values;
      try {
        const res = await axios.post("/api/admin/login", rest, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.data;
        //dispatch(storeOTP(data.activationToken))
        //console.log(res.data);
        action.resetForm();
        Success(data.message);
        navigate("/admin/dashboard");
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message)
      } finally {
        action.setSubmitting(false);
      }
    },
  });




  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <section className="shadow-lg text-center p-8 bg-white">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Admin Login
          </Typography>
          <Typography className="mb-2 text-gray-600 font-normal text-[18px]">
            Enter your email and password to sign in
          </Typography>
          <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="name@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.email&&touched.email?<div className='text-red-700'>{errors.email}</div>:null}
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Password
                </Typography>
              </label>
              <Input
                size="lg"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
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
              />
              {errors.password&&touched.password?<div className='text-red-700'>{errors.password}</div>:null}
            </div>
            <Button disabled={isSubmitting} type="submit" color="black" size="lg" className="mt-6" fullWidth>
              sign in
            </Button>
            
           
          </form>
        </div>
      </section>
    </div>
    
  );
}

export default AdminLogin;