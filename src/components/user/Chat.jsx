import React, { useEffect, useState } from "react";
import { HiChatAlt2 } from "react-icons/hi";
import { state } from "@/context/store";
import { User } from "@/containers";

const Chat = ({ conversation }) => {
  const messages = conversation.messages;
  const { user, setChatUser, setIsOpen } = state();
  const [lastMessage, setLastMessage] = useState(messages[messages.length - 1]);
  const isOwn = lastMessage.senderId === user.id ? true : false;
  const users = conversation.users.filter((user_) => user_.id !== user.id);
  const name = users.length >= 2 ? conversation.name : users[0].Name;
  const image = users.length > 1 ? conversation.image : users[0].image;

  const NameClick = () => {
    setIsOpen(window.innerWidth <= 800 ? false : true);
    setChatUser(users.length > 1 ? conversation : users[0]);
  };
  const IconClick = () => {
    setIsOpen(false);
    setChatUser(users.length > 1 ? conversation : users[0]);
  };
  return (
    <div className="w-full h-full">
      <User
        id={users.length > 1 ? conversation.id : users[0].id}
        name={name}
        status={`${isOwn ? "sent" : "recieved"}:${lastMessage.body}`}
        image={image}
        icon={<HiChatAlt2 />}
        NameClick={() => NameClick()}
        IconClick={() => IconClick()}
      />
    </div>
  );
};

export default Chat;
