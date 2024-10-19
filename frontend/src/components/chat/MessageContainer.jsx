import { useState, useEffect, useRef } from "react";

import { Failed, Success } from "../../helper/popup";
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
  const [typing, setTyping] = useState(false);
  const [chat, setChat] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const { id } = useParams();
  const fetchRef = useRef(false);

  const handleNewMessage = (newMessage) => {
    const { senderId, receiverId } = newMessage.messageData;
    if (senderId == userInfo._id || senderId == id) {
      setMessages((prevMessages) => [...prevMessages, newMessage.messageData]);
    }
  };
  useEffect(() => {
    if (chat) {
      socket.emit("joinChat", { chat });
    }
    socket?.on("newMessage", handleNewMessage);
    return () => {
      socket?.off("newMessage", handleNewMessage);
      if (chat) socket?.off("joinChat", () => console.log("chat closed"));
    };
  }, [id, chat]);

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
        setChat(res.data._id);
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
        <div className="flex-col w-full bg-gray-800 h-full">
          <div className="h-[60px] bg-gray-900">
            <div className="flex items-center">
              <Avatar
                variant="circular"
                alt="tania andrew"
                src={`/api/images/${receiver?.profilePic || "user.png"}`}
                className="mx-2 mt-1"
              />

              <div className="font-bold text-xl text-white">
                {receiver.name}
                {typing && (
                  <div className="text-xs text-green-600 ">Typing...</div>
                )}
              </div>
            </div>
          </div>
          <Messages messages={messages} />
          <MessageInput1 addMessage={addMessage} chat={chat} />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
