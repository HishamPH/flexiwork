import { ChatItem } from "react-chat-elements";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSocketContext } from "../../socket/SocketContext";
import axiosInstance from "../../../interceptors/axiosInterceptors";
import { Failed } from "../../helper/popup";
import moment from "moment";

import "./people.css";

const formatDate = (date) => {
  const momentDate = moment(date);
  const now = moment();

  if (momentDate.isSame(now, "day")) {
    return `${momentDate.format("HH:mm")}\tToday`;
  } else if (momentDate.isSame(now.subtract(1, "day"), "day")) {
    return `${momentDate.format("HH:mm")}\tYesterday`;
  } else {
    return momentDate.format("HH:mm\tDD/MM/YYYY");
  }
};

const PeopleList = () => {
  const { socket, onlineUsers } = useSocketContext();
  const { userInfo } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosInstance.post(
          `/user/chat/get-conversations`,
          { senderId: userInfo._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("PeopleList 64");
        setConversations(res.data.result);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      }
    };
    getConversations();

    socket?.on("newMessage", () => {
      getConversations();
    });
    return () => {
      return socket?.off("newMessage");
    };
  }, [socket]);

  const handleClick = (userId) => {
    navigate(`/${userInfo.role}/chats/${userId}`);
  };

  return (
    <>
      <div className="flex-col">
        {conversations.map((item) => {
          const person = item.participants[0];

          const isAcive = person._id === id;
          return (
            <ChatItem
              key={item._id}
              onClick={() => handleClick(person._id)}
              avatar={`/api/images/${person.profilePic}`}
              title={person.name}
              date
              dateString={formatDate(item.updatedAt)}
              className={`${isAcive ? "my-custom-container" : ""}`}
              statusColor={`${onlineUsers.includes(person._id) ? "green" : ""}`}
              style={{
                backgroundColor: "green",
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default PeopleList;
