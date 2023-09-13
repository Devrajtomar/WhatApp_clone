import React, { useEffect, useState } from "react";
import { modal, state } from "@/context/store";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { Chat } from "../user";
import axios from "axios";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const Chats = () => {
  const [conversations, setConversations] = useState([]);
  const { setNewGroup } = modal();
  const { user, setFriends } = state();
  const getChats = async () => {
    if (user.conversations.length !== 0) {
      user.conversations.forEach(async (conv) => {
        const res = await axios.post("/api/conversations/allChats", {
          id: conv.id,
        });

        if (res.status === 200 && res.data.conversation.messages.length !== 0) {
          const isNewConversation = conversations.every(
            (conv) => conv.id !== res.data.conversation.id,
          );
          if (isNewConversation) {
            setConversations((curr) => [...curr, res.data.conversation]);
          }
        }
      });
    }
  };

  useEffect(() => {
    getChats();
  }, [user]);
  return (
    <div className="w-full h-full flex justify-start flex-col items-start md:gap-2 mt-2 relative overflow-y-scroll">
      <div className="w-full h-fit flex justify-between items-center p-1">
        <div className="heading_2">Messages</div>
        <AiOutlineUsergroupAdd
          className="btn_ min-w-[60px] p-0  rounded-sm"
          size={30}
          onClick={() => setNewGroup(true)}
        />
      </div>
      {conversations.length > 0 && (
        <div className="users">
          {conversations.map((chat) => (
            <Chat key={chat.id} conversation={chat} />
          ))}
        </div>
      )}
      <HiChatBubbleLeft
        size={50}
        className="IconBottom"
        onClick={() => setFriends(true)}
      />
      {conversations.length === 0 && (
        <div className="w-full h-full flex justify-center items-center flex-col gap-2">
          <div className="text-lg md:text-2xl font-semibold text-center">
            No conversations yet! Start a conversation
          </div>
          <div className="btn" onClick={() => setFriends(true)}>
            Friends
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
