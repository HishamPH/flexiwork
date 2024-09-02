
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { MenuItems,MenuItem, Transition,Menu, MenuButton } from '@headlessui/react';
import { Fragment } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { loginValidation } from '../validations/validation';

import { useFormik } from 'formik';
import axios from 'axios';
import { Success,Failed } from '../helper/popup';
import { useDispatch,useSelector } from 'react-redux';
import { storeOTP,setUser } from '../redux/slices/userAuth';

const initialValues = {
  email:'',
  password:''
}

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('Select Role');
  const [selectedType, setSelectedType] = useState('candidate');
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
    validationSchema:loginValidation,
    onSubmit:async(values,action)=>{
      const {...rest} = values;
      rest.role = selectedRole;
      try {
        const res = await axios.post('/api/user/signin',rest,{
          headers:{
            "Content-Type":"application/json",
          },
        });
        console.log(res);
        const data = res.data;
        dispatch(setUser(res.data));
        action.resetForm();
        Success(data.message);
        if(data.role==='candidate')
          navigate('/candidate/home');
        else
          navigate('/recruiter/home');
      }catch(err){
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message)
      }finally {
        action.setSubmitting(false);
      }
    }
  })
  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg max-w-md w-full">


        {/* Role Selection Buttons */}
      <div className="flex rounded-md shadow-sm justify-center" role="group">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-l-md ${
            selectedType === 'candidate'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } border border-gray-200`}
          onClick={() => setSelectedType('candidate')}
        >
          Candidate
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-r-md ${
            selectedType === 'recruiter'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } border border-gray-200`}
          onClick={() => setSelectedType('recruiter')}
        >
          Recruiter
        </button>
      </div>
      {/* Role Selection Buttons */}



        {/* Role Selection Dropdown */}
        <div className="mb-6">
          <Menu as="div" className="relative">
            <MenuButton className='flex items-center justify-between p-3 bg-blue-gray-600 rounded-lg cursor-pointer border border-gray-300 shadow-sm'>
            
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
              <MenuItems className="absolute w-full mt-2 origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => handleRoleChange('candidate')}
                      className={`block px-4 py-2 text-sm w-full text-left ${focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      candidate
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => handleRoleChange('recruiter')}
                      className={`block px-4 py-2 text-sm w-full text-left ${focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      recruiter
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>

        {/* Login Form */}
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email&&touched.email?<div className='text-red-700'>{errors.email}</div>:null}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password&&touched.password?<div className='text-red-700'>{errors.password}</div>:null}
          </div>

          <button 
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-500 text-white py-3 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
          Don't have an account? <Link to='/signup' className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
