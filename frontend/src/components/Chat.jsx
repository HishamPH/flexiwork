import PeopleList from "./chat/PeopleList";
import MessageContainer from "./chat/MessageContainer";
import { useSocketContext } from "../socket/SocketContext";
const Chat = () => {
  return (
    <div className="flex h-3/5">
      {/* <PeopleList /> */}
      <MessageContainer />
    </div>
  );
};

export default Chat;
