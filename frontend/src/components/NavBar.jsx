import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { logoutUser } from "../redux/slices/userAuth";
import { Success, Failed } from "../helper/popup";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";

const NavBar = () => {
  const { userInfo } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      dispatch(logoutUser());
      Success("Logout successful");
      navigate("/");
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };
  let profilePath = "";
  if (userInfo) {
    if (userInfo.role === "recruiter") {
      profilePath = "recruiter";
    } else {
      profilePath = "candidate";
    }
  } else {
    profilePath = "/";
  }
  return (
    <header
      className="container max-w-full  p-4 flex justify-between items-center text-white"
      style={{
        backgroundColor: "#1e293b",
      }}
    >
      <div className="flex items-center">
        <Link to={`/${profilePath}/home`} className="flex">
          <div className="w-8 h-8 bg-indigo-600 rounded-full mr-2"></div>
          <span className="text-xl font-bold">FlexiWork</span>
        </Link>
      </div>
      <nav className="flex items-center">
        {/* <Link to='#' className="mr-6 hover:text-indigo-400">Browse Companies</Link> */}
        {userInfo ? (
          userInfo?.role === "recruiter" ? (
            <>
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    alt="tania andrew"
                    className="cursor-pointer"
                    src={`/api/images/user.png`}
                  />
                </MenuHandler>
                <MenuList className="p-1 bg-white">
                  <Link to={`/${profilePath}/profile`}>
                    <MenuItem className="flex items-center gap-2 m-0">
                      <UserCircleIcon className="h-6 w-6" />
                      <Typography variant="h6" className="font-medium">
                        Profile
                      </Typography>
                    </MenuItem>
                  </Link>
                  <hr className="my-1 border-blue-gray-50" />
                  <MenuItem
                    className="flex items-center gap-2 text-red-900 hover:text-red-800"
                    onClick={handleLogout}
                  >
                    <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                    <Typography variant="h6" className="font-medium ">
                      Sign Out
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    alt="tania andrew"
                    className="cursor-pointer"
                    src={`/api/images/user.png`}
                  />
                </MenuHandler>
                <MenuList className="p-1 bg-white">
                  <Link to={`/${profilePath}/profile`}>
                    <MenuItem className="flex items-center gap-2 m-0">
                      <UserCircleIcon className="h-6 w-6" />
                      <Typography variant="h6" className="font-medium">
                        Profile
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to={`/${profilePath}/chats`}>
                    <MenuItem className="flex items-center gap-2 m-0">
                      <ChatBubbleLeftIcon className="h-6 w-6" />
                      <Typography variant="h6" className="font-medium">
                        Chats
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to={`/${profilePath}/applications`}>
                    <MenuItem className="flex items-center gap-2 m-0">
                      <AcademicCapIcon className="h-6 w-6" />
                      <Typography variant="h6" className="font-medium">
                        Applications
                      </Typography>
                    </MenuItem>
                  </Link>
                  <hr className="my-1 border-blue-gray-50" />
                  <MenuItem
                    className="flex items-center gap-2 text-red-900 hover:text-red-800"
                    onClick={handleLogout}
                  >
                    <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                    <Typography variant="h6" className="font-medium ">
                      Sign Out
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )
        ) : (
          <>
            <Link to="#" className="mr-6 hover:text-indigo-400">
              Find Jobs
            </Link>
            <Link to="login">
              <button className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 mx-2">
                Login
              </button>
            </Link>
            <Link to="signup">
              <button className="bg-black px-4 py-2 rounded hover:bg-neutral-800">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
