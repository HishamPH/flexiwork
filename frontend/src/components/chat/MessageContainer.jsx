import { useState, useEffect, useRef } from "react";

import { Failed } from "../../helper/popup";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import MessageInput1 from "./MessageInput";
import Messages from "./Messages";

import Loader from "../../helper/Loader";

import { useSocketContext } from "../../socket/SocketContext";

const MessageContainer = () => {
  const { socket } = useSocketContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { id } = useParams();
  const fetchRef = useRef(false);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [messages, setMessages, socket]);

  useEffect(() => {
    const getMessages = async () => {
      if (!userInfo || !id || fetchRef.current) return; // Prevent the second call in Strict Mode
      fetchRef.current = true;
      try {
        setLoading(true);
        const res = await axios.post(
          `/api/user/chat/get-messages/${id}`,
          { senderId: userInfo._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessages(res.data.messages);
        setLoading(false);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      }
    };
    getMessages();
    return () => {};
  }, [id]);

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
        <div className="flex-col w-full bg-blue-gray-100 h-[620px]">
          <Messages messages={messages} />
          <MessageInput1 addMessage={addMessage} />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
