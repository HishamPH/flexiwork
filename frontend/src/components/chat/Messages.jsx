import { MessageList } from "react-chat-elements";

import React from "react";

const Messages = () => {
  return (
    <>
      <MessageList
        className="message-list w-3/4 bg-black"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[
          {
            position: "left",
            type: "text",
            title: "Kursat",
            text: "Give me a message list example !",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
          },
        ]}
      />
    </>
  );
};

export default Messages;
