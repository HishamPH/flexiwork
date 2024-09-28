import { useState, useEffect, useRef } from "react";

import { Failed } from "../../helper/popup";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import axiosInstance from "../../../interceptors/axiosInterceptors";

import MessageInput1 from "./MessageInput";
import Messages from "./Messages";

import Loader from "../../helper/Loader";

import { useSocketContext } from "../../socket/SocketContext";

import { Avatar } from "@material-tailwind/react";

const MessageContainer = () => {
  const { socket, onlineUsers } = useSocketContext();
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { id } = useParams();
  const fetchRef = useRef(false);

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    socket?.on("newMessage", handleNewMessage);
    console.log("Hello");
    return () => socket?.off("newMessage", handleNewMessage);
  }, [setMessages, socket]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.post(
          `/user/chat/get-messages/${id}`,
          { senderId: userInfo._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessages(res.data.messages);
        setReceiver(res.data.participants[0]);
        setLoading(false);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      }
    };
    getMessages();
    return () => {};
  }, [id, setMessages]);

  const addMessage = (message) => {
    setMessages((prevMessages) => {
      return [...prevMessages, message];
    });
  };
  return (
    <>
      {loading ? (
        <div className="flex-col w-full bg-blue-gray-300 h-[620px]">
          <Loader />
        </div>
      ) : (
        <div className="flex-col w-full bg-blue-gray-100 h-full">
          <div className="h-[60px] bg-blue-gray-400">
            <div>
              <Avatar
                variant="circular"
                alt="tania andrew"
                src={`/api/images/${receiver?.profilePic || "user.png"}`}
                className="mx-2 mt-1"
              />
              {receiver.name}
            </div>
          </div>
          <Messages messages={messages} />
          <MessageInput1 addMessage={addMessage} />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
