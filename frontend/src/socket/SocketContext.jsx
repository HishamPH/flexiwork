import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

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
  useEffect(() => {
    if (userInfo) {
      const socketUrl = "http://localhost:3000";
      const socket = io(socketUrl, {
        query: {
          userId: userInfo._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      socket.on("proUserDemoted", (data) => {
        console.log(data, "this user is demoted successfully");
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext, useSocketContext };
