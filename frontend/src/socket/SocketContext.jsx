import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      const socketUrl = "http://localhost:3000";
      const socketInstance = io(socketUrl);
      setSocket(socketInstance);
      return () => {
        socketInstance.close();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
