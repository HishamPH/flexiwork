import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import axiosInstance from "../../../interceptors/axiosInterceptors";

import EmojiPicker from "emoji-picker-react";

import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSocketContext } from "../../socket/SocketContext";

const MessageInput1 = ({ chat }) => {
  console.log(chat);
  let { userInfo } = useSelector((state) => state.user);
  const { socket } = useSocketContext();
  let [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(false);

  let { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    message.trim();
    if (message.length === 0) return;
    try {
      const res = await axiosInstance.post(
        `/user/chat/send-message/${id}`,
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
      setEmoji(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiClick = (emoj) => {
    console.log(emoj.emoji);
    setMessage((prev) => `${prev}${emoj.emoji}`);
  };

  return (
    <div>
      <div className="flex w-full rounded-md relative bg-gray-900 h-[60px] py-2">
        <div className="absolute bottom-16">
          <EmojiPicker open={emoji} onEmojiClick={handleEmojiClick} />
        </div>
        <button
          className="hover:bg-gray-700 active:bg-gray-700 rounded-full px-3 mx-1 text-white"
          onClick={() => setEmoji((prev) => !prev)}
        >
          <FaceSmileIcon className="w-6 h-6" />
        </button>
        <form onSubmit={handleSubmit} className="flex w-full rounded-sm">
          <input
            type="text"
            className="w-full me-2 rounded-full ps-5 bg-gray-800 focus:outline-none text-white text-md caret-gray-300"
            placeholder="Type something here..."
            value={message}
            onChange={handleChange}
            style={{
              caretWidth: 3,
            }}
          />
          <button
            disabled={message.trim().length === 0}
            type="submit"
            className={`py-2 px-3 me-2  text-white rounded-full ${
              message.trim().length === 0 ? "bg-gray-800" : "bg-black"
            }`}
          >
            <PaperAirplaneIcon className="text-white h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput1;
