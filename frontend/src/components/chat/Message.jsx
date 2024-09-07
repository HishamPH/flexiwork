import React from "react";
import { MessageList, MessageBox } from "react-chat-elements";
import { useSelector } from "react-redux";
import { format, isToday, isYesterday, isSameDay, parseISO } from "date-fns";
import "react-chat-elements/dist/main.css";
import "./MessageBox.css";

// const formatMessageTime = (date) => {
//   const messageDate = parseISO(date);
//   if (isToday(messageDate)) {
//     return format(messageDate, "HH:mm");
//   } else if (isYesterday(messageDate)) {
//     return "Yesterday";
//   } else {
//     return format(messageDate, "dd/MM/yyyy");
//   }
// };

// const DateSeparator = ({ date }) => {
//   const messageDate = parseISO(date);
//   let dateString;
//   if (isToday(messageDate)) {
//     dateString = "Today";
//   } else if (isYesterday(messageDate)) {
//     dateString = "Yesterday";
//   } else {
//     dateString = format(messageDate, "MMMM d, yyyy");
//   }

//   return (
//     <div className="date-separator">
//       <span>{dateString}</span>
//     </div>
//   );
// };

const Message = ({ message }) => {
  const { userInfo } = useSelector((state) => state.user);
  const fromMe = message.senderId === userInfo._id;
  const position = fromMe ? "right" : "left";
  // let currentDate = null;
  // const messageDate = parseISO(message.createdAt);
  // const showDateSeparator =
  //   !currentDate || !isSameDay(currentDate, messageDate);

  // if (showDateSeparator) {
  //   currentDate = messageDate;
  //   return (
  //     <React.Fragment key={`separator-${message._id}`}>
  //       <DateSeparator date={message.createdAt} />
  //       <MessageBox
  //         position={position}
  //         type="text"
  //         text={message.message}
  //         date={formatMessageTime(message.createdAt)}
  //         replyButton={true}
  //       />
  //     </React.Fragment>
  //   );
  // }

  return (
    <>
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
    </>
  );
};

export default Message;
