import PeopleList from "./chat/PeopleList";
import Messages from "./chat/Messages";
const Chat = () => {
  return (
    <div className="flex">
      <PeopleList />
      <Messages />
    </div>
  );
};

export default Chat;
