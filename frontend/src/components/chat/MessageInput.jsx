import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const MessageInput1 = ({ addMessage }) => {
  let { userInfo } = useSelector((state) => state.user);
  let [message, setMessage] = useState("");
  let { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.length === 0) return;
    try {
      const res = await axios.post(
        `/api/user/chat/send-message/${id}`,
        { message, senderId: userInfo._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { message: text, senderId, receiverId, createdAt } = res.data;
      //addMessage({ message: text, senderId, receiverId, createdAt });
      setMessage("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <div className="flex w-full rounded-md mt-4">
        <form onSubmit={handleSubmit} className="flex w-full rounded-sm">
          <input
            type="text"
            className="w-full me-2 rounded-full ps-5"
            value={message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="py-2 px-4 bg-black text-white rounded-full"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput1;
