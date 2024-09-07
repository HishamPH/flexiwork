import { useRef, useEffect } from "react";

import Message from "./Message";

const Messages = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-4/5 overflow-y-scroll">
      {messages?.map((message, index) => {
        return (
          <div key={index}>
            <Message message={message} />
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
