import PeopleList from "./chat/PeopleList";

import { useSelector } from "react-redux";

import { Outlet, useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();

  return (
    <div className="flex h-3/5">
      <PeopleList />
      {!id ? <NoChatSelected /> : <Outlet />}
    </div>
  );
};

export const NoChatSelected = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-center w-full h-[600px] bg-blue-gray-300">
      <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {userInfo.name} ❄</p>
        <p>Select a chat to start messaging</p>
        {/* // <TiMessages className="text-3xl md:text-6xl text-center" /> */}
      </div>
    </div>
  );
};

export default Chat;
