import { useState, useEffect } from "react";

import { Failed } from "../../helper/popup";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import MessageInput from "./MessageInput";
import Messages from "./Messages";

import { io } from "socket.io-client";

const MessageContainer = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const { userInfo } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    if (userInfo) {
      const userId = userInfo._id;
      const socket = io("http://localhost:3000", {
        query: {
          userId: userId,
        },
      });
      setSocket(socket);
      socket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
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
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.post(
          `/api/user/chat/get-messages/${id}`,
          { senderId: userInfo._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res.data);
        setMessages(res.data.messages);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      }
    };
    getMessages();
  }, [setMessages]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  return (
    <>
      <div className="flex-col w-full bg-blue-gray-300 h-[620px]">
        <Messages messages={messages} />
        <MessageInput addMessage={addMessage} />
      </div>
    </>
  );
};

export default MessageContainer;
