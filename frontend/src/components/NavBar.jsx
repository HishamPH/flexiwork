import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../redux/slices/userAuth";

import {
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

import { Success, Failed } from "../helper/popup";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";

import { FaCrown } from "react-icons/fa6";
import { MdOutlineNotificationsActive } from "react-icons/md";

import ProModal from "./ProModal";
import { openModal } from "../redux/slices/modalSlice";

import { useSocketContext } from "../socket/SocketContext";
import axiosInstance from "../../interceptors/axiosInterceptors";

import { useLogout } from "../hooks/useLogout";

import { Dialog, Drawer } from "@material-tailwind/react";

import Notifications from "./Notifications";

const NavBar = () => {
  const { handleLogout, navigate } = useLogout();
  const { userInfo } = useSelector((state) => state.user);
  const { socket } = useSocketContext();
  const [noti, setNoti] = useState(false);
  const [notifications, setNotifications] = useState([]);
  let dispatch = useDispatch();

  const demoteUser = async () => {
    const res = await axiosInstance.post("/user/demote-user", {
      userId: userInfo._id,
    });
    dispatch(setUser(res.data.result));
    dispatch(openModal());
    Success("your pro has expired !!!! ");
  };

  const handelNewNotification = (newMessage) => {
    setNotifications((prev) => [newMessage.notification, ...prev]);
  };

  useEffect(() => {
    socket?.on("newNoti", handelNewNotification);
    return () => socket?.off("newNoti", handelNewNotification);
  }, [setNotifications, socket]);

  useEffect(() => {
    console.log(new Date(userInfo?.proExpiry));
    if (userInfo && userInfo.isPro) {
      const expiry = new Date(userInfo?.proExpiry);
      const now = new Date();
      const remaining = expiry - now;
      if (userInfo.proExpiry && remaining < 0) {
        demoteUser();
      }
      if (remaining > 0) {
        console.log(remaining);
        const timer = setTimeout(demoteUser, remaining);
        return () => clearTimeout(timer);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      const getNotifications = async (userId) => {
        try {
          const res = await axiosInstance.get(
            `/user/get-notifications/${userId}`
          );
          setNotifications(res.data.result);
        } catch (err) {
          Failed(err.response ? err.response.data.message : err.message);
          console.log(err.message);
        }
      };
      getNotifications(userInfo._id);
    }
  }, [setNotifications]);

  const handleUpgrade = async () => {
    dispatch(openModal());
  };

  let profilePath = "";
  if (userInfo) {
    if (userInfo.role === "recruiter") {
      profilePath = "/recruiter/home";
    } else {
      profilePath = "/candidate/home";
    }
  } else {
    profilePath = "/";
  }
  return (
    <>
      <header
        className="container max-w-full  p-4 flex justify-between items-center text-white"
        style={{
          backgroundColor: "#1e293b",
        }}
      >
        <div className="flex items-center">
          <Link to={profilePath} className="flex">
            <div className="w-8 h-8 bg-indigo-600 rounded-full mr-2"></div>
            <span className="text-xl font-bold">FlexiWork</span>
          </Link>
          {userInfo &&
            (userInfo?.isPro ? (
              <div className="bg-red-500 ms-1 px-2 py-0 rounded-full font-extrabold">
                pro
              </div>
            ) : (
              <Button
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-sm ms-3 py-3 px-3 font-extrabold"
                onClick={handleUpgrade}
              >
                Upgrade
              </Button>
            ))}
        </div>
        <nav className="flex items-center">
          {/* <Link to='#' className="mr-6 hover:text-indigo-400">Browse Companies</Link> */}
          {userInfo ? (
            <>
              <Notifications />

              {userInfo?.role === "recruiter" ? (
                <>
                  <Menu placement="bottom-end">
                    <MenuHandler>
                      <Avatar
                        variant="circular"
                        alt="tania andrew"
                        className="cursor-pointer"
                        src={`/api/images/${userInfo.profilePic}`}
                      />
                    </MenuHandler>
                    <MenuList className="p-1 bg-white">
                      <Link to={`/recruiter/profile`}>
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
                        src={`/api/images/${userInfo.profilePic}`}
                      />
                    </MenuHandler>
                    <MenuList className="p-1 bg-white">
                      <Link to={`/candidate/profile`}>
                        <MenuItem className="flex items-center gap-2 m-0">
                          <UserCircleIcon className="h-6 w-6" />
                          <Typography variant="h6" className="font-medium">
                            Profile
                          </Typography>
                        </MenuItem>
                      </Link>
                      <Link to={`/candidate/chats`}>
                        <MenuItem className="flex items-center gap-2 m-0">
                          <ChatBubbleLeftIcon className="h-6 w-6" />
                          <Typography variant="h6" className="font-medium">
                            Chats
                          </Typography>
                        </MenuItem>
                      </Link>
                      <Link to={`/candidate/applications`}>
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
              )}
            </>
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
      <ProModal navigate={navigate} />
    </>
  );
};

export default NavBar;
