import { createContext, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setUser } from "../redux/slices/userAuth";
import { openModal } from "../redux/slices/modalSlice";
import { Success, Failed } from "../helper/popup";

const SocketContext = createContext();

const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    console.log("Socket context is not initialized yet");
    return {};
  }
  return context;
};

const SocketProvider = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();

  const isLoggedIn = userInfo ? true : false;

  useEffect(() => {
    if (window.location.pathname.includes("/admin")) {
      return;
    }
    if (userInfo) {
      const socketUrl = import.meta.env.VITE_BACKEND;
      console.log(socketUrl);
      const socket = io(socketUrl, {
        query: {
          userId: userInfo._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      socket.on("userStatus", (data) => {
        if (data.isPro !== userInfo.isPro) {
          dispatch(setUser(data));
          dispatch(openModal());
          Success("the user is demoted");
        }
      });

      return () => {
        socket.close();
        console.log("socket has closed successfully");
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [isLoggedIn]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext, useSocketContext };
