import React from "react";
import { MessageList, MessageBox } from "react-chat-elements";
import { useSelector } from "react-redux";
import "./MessageBox.css";
const Message = ({ message }) => {
  const { userInfo } = useSelector((state) => state.user);
  const fromMe = message.senderId === userInfo._id;
  const position = fromMe ? "right" : "left";

  return (
    <div>
      <MessageBox
        position={position}
        type="text"
        text={message.message}
        date={message.createdAt}
        replyButton={true}
        className="text-black"
      />
    </div>
  );
};

export default Message;
