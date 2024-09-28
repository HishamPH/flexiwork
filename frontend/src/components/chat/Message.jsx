import React from "react";
import { MessageBox } from "react-chat-elements";
import { useSelector } from "react-redux";
import "react-chat-elements/dist/main.css";
import "./MessageBox.css";

const formatDate = (date) => {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Message = ({ message }) => {
  const { userInfo } = useSelector((state) => state.user);
  const fromMe = message.senderId === userInfo._id;
  const position = fromMe ? "right" : "left";

  return (
    <>
      <div>
        <MessageBox
          position={position}
          type="text"
          text={message.message}
          replyButton={true}
          date
          className="text-black"
          dateString={formatDate(message.updatedAt)}
        />
      </div>
    </>
  );
};

export default Message;
