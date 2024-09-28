import { useRef, useEffect } from "react";

import Message from "./Message";

import moment from "moment";

const formatDate = (date, format = "MMM D, YYYY") => {
  const today = moment();
  const messageDate = moment(date);

  if (messageDate.isSame(today, "day")) {
    return "Today";
  } else if (messageDate.isSame(today.subtract(1, "days"), "day")) {
    return "Yesterday";
  } else {
    return messageDate.format(format);
  }
};

const isSameDay = (date1, date2) => {
  return moment(date1).isSame(date2, "day");
};

const Messages = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, [messages]);

  return (
    <div className="h-[480px] overflow-y-scroll">
      {messages?.map((message, index) => {
        const showDateSeparator =
          index === 0 ||
          !isSameDay(message.updatedAt, messages[index - 1].updatedAt);

        return (
          <div key={index}>
            {showDateSeparator && (
              <div className="">
                <div className="flex justify-center">
                  <div className="bg-white px-2 py-1 rounded-sm shadow-md text-sm">
                    {formatDate(message.updatedAt)}
                  </div>
                </div>
              </div>
            )}
            <Message message={message} />
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
