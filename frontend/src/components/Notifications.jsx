import React, { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";

import { useSocketContext } from "../socket/SocketContext";
import { useSelector } from "react-redux";
import axiosInstance from "../../interceptors/axiosInterceptors";
import { Failed } from "../helper/popup";

import moment from "moment";

const formatDate = (date) => {
  const momentDate = moment(date);
  const now = moment();

  if (momentDate.isSame(now, "day")) {
    return `${momentDate.format("HH:mm")}\tToday`;
  } else if (momentDate.isSame(now.subtract(1, "day"), "day")) {
    return `${momentDate.format("HH:mm")}\tYesterday`;
  } else {
    return momentDate.format("HH:mm\tDD/MM/YYYY");
  }
};

const Notifications = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { socket } = useSocketContext();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const handelNewNotification = (newMessage) => {
    console.log("this is a notification");
    setNotifications((prev) => [newMessage.notification, ...prev]);
  };

  useEffect(() => {
    socket?.on("newNoti", handelNewNotification);
    socket?.on("meetAlert", (data) => {
      console.log(data);
    });

    return () => {
      socket?.off("newNoti", handelNewNotification);
      socket?.off("meetAlert", () => {
        console.log("hello");
      });
    };
  }, [socket]);

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
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const clearAllNotifications = async () => {
    try {
      const res = await axiosInstance.post(
        "/user/clear-notifications",
        {
          userId: userInfo._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNotifications([]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeNotification = async (id) => {
    try {
      const res = await axiosInstance.post(
        "/user/delete-notification",
        {
          notificationId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNotifications(
        notifications.filter((notification) => notification._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative mr-3 " ref={notificationRef}>
      <button
        onClick={toggleNotifications}
        className="relative text-white p-2 rounded-full shadow-lg transition-colors"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute top-10 right-0 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-50">
          <div className="bg-blue-500 text-white p-2 font-bold flex justify-between items-center">
            <span>Recent Notifications</span>
            <button
              onClick={clearAllNotifications}
              className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
            >
              Clear All
            </button>
          </div>
          <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="p-3 text-center text-gray-500">
                No notifications
              </li>
            ) : (
              notifications.map(
                ({ _id, message, senderId, receiverId, createdAt }) => (
                  <li key={_id} className="p-3 hover:bg-gray-50 relative">
                    <button
                      onClick={() => removeNotification(_id)}
                      className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                    <p className="text-sm text-black pr-5">
                      {senderId.name} sent you a message
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(createdAt)}
                    </p>
                  </li>
                )
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
