import { ChatItem } from "react-chat-elements";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSocketContext } from "../../socket/SocketContext";

const PeopleList = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const { socket } = useSocketContext();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.post(
          `/api/user/chat/get-conversations`,
          { senderId: userInfo._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setConversations(res.data.result);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      }
    };
    getConversations();
  }, [setConversations, socket]);
  const handleClick = (userId) => {
    navigate(`/${userInfo.role}/chats/${userId}`);
  };

  return (
    <>
      <div className="flex-col">
        {conversations.map((item) => {
          const isAcive = item._id === id;

          return (
            // <NavLink to={`/${userInfo.role}/chats/${item._id}}`}>
            <ChatItem
              key={item._id}
              onClick={() => handleClick(item._id)}
              avatar={`/api/images/${item.profilePic}`}
              title={item.name}
              date={item.createdAt}
              className={`${isAcive ? "text-green-600" : ""}`}
            />
            // </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default PeopleList;
