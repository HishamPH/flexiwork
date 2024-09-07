import { ChatList } from "react-chat-elements";

const PeopleList = () => {
  return (
    <>
      <ChatList
        className="chat-list w-1/2 bg-blue-gray-500"
        dataSource={[
          {
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
            alt: "kursat_avatar",
            title: "Kursat",
            subtitle: "Why don't we go to the No Way Home movie this weekend ?",
            date: new Date(),
            unread: 3,
          },
        ]}
      />
    </>
  );
};

export default PeopleList;
