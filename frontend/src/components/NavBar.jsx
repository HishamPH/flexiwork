import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { logoutUser } from '../redux/slices/userAuth';
import { Success,Failed } from '../helper/popup';

const NavBar = () => {
  const {userInfo} = useSelector(state=>state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const handleLogout = (e)=>{
    e.preventDefault();
    try {
      dispatch(logoutUser());
      Success('Logout successful');
      navigate('/')
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message)
    }
  }
  let profilePath = '';
  if(userInfo){
    if(userInfo.role === 'recruiter'){
      profilePath = 'recruiter'
    }else{
      profilePath = 'candidate'
    }
  }
  return (
    <header className="container max-w-full  p-4 flex justify-between items-center text-white" style={{
      backgroundColor:'#1e293b'
    }}>
    <div className="flex items-center">
      <div className="w-8 h-8 bg-indigo-600 rounded-full mr-2"></div>
      <span className="text-xl font-bold">FlexiWork</span>
    </div>
    <nav className="flex items-center">
      {/* <Link to='#' className="mr-6 hover:text-indigo-400">Browse Companies</Link> */}
      {userInfo?(
        <Menu as="div" className="relative z-50">
        <MenuButton className="flex items-center space-x-2">
          <span className="text-white font-semibold">{userInfo.name}</span>
          <img src={`/api/images/user.png`} alt="Profile" className="rounded-full" style={{
              width:'40px',
              height:'40px'
            }} />
              
        
          
          <ChevronDownIcon className="h-5 w-5 text-white" />
        </MenuButton>
      
        <Transition
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="flex-col absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-0">
              <MenuItem className="bg-white hover:bg-blue-gray-100 block p-3 rounded-lg text-black">
                
                <Link to={`/${profilePath}/profile`} className='flex items-center'>
                  <i className='fas fa-user mr-3'></i>
                  Profile
                </Link>
          
              </MenuItem>
              <MenuItem className="bg-white hover:bg-blue-gray-100 block p-3 rounded-lg text-black">
              
                <button onClick={handleLogout} className='flex items-center text-red-700 w-full'>
                  <i className='fas fa-solid fa-arrow-right-from-bracket mr-3'></i>
                  Logout
                </button>
              
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>):
      <>
        <Link to='#' className="mr-6 hover:text-indigo-400">Find Jobs</Link>
        <Link to='login'>
          <button className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 mx-2">Login</button>
        
        </Link>
        <Link to='signup'>
          <button className="bg-black px-4 py-2 rounded hover:bg-neutral-800">Sign Up</button>
        </Link>
      </>}
    </nav>
  </header>
  )
}

export default NavBar;