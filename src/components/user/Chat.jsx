import React from "react";
import Image from "next/image";
import { HiChatAlt2 } from "react-icons/hi";
import { state } from "../../context/store";
import { format } from "date-fns";

const Chat = ({ conversation }) => {
  const { user, setChatUser, setIsOpen } = state();
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const users = conversation.users.filter((user_) => user_.id !== user.id);
  const name = users.length >= 2 ? conversation.name : users[0].Name;
  const image = users.length > 1 ? conversation.image : users[0].image;
  return (
    <div
      className="user"
      onClick={() => {
        setIsOpen(window.innerWidth <= 800 ? false : true);
        setChatUser(users.length > 1 ? conversation : users[0]);
      }}
    >
      <Image
        width={60}
        height={60}
        alt="Default"
        className="rounded-full h-[60px] w-[60px]"
        src={image ? image : "/DefaultUser.jpg"}
      />
      <div className="w-full">
        <h3 className="text-base md:text-lg heading_2">{name}</h3>
        <div className="m-0 flex justify-start items-center gap-1 w-full whitespace-nowrap text-ellipsis overflow-hidden">
          <pre className="heading_3 text-sm md:text-base">
            {format(new Date(lastMessage.createdAt), "p")}:
          </pre>
          <pre className="heading_3 text-sm md:text-base text-ellipsis font-serif m-0">
            {lastMessage.body}
          </pre>
        </div>
      </div>
      <HiChatAlt2
        className="hover:bg-zinc-100 rounded-full p-1 mr-2"
        style={{ width: "4rem", height: "2.5rem" }}
        size={30}
      />
    </div>
  );
};

export default Chat;
