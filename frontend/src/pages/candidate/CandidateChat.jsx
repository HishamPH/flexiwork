import React from "react";
import NavBar from "../../components/NavBar";
import Chat from "../../components/Chat";

const CandidateChat = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-16 px-4">
        <Chat />
      </div>
    </div>
  );
};

export default CandidateChat;
