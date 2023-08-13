import React, { useEffect, useState } from "react";
import { state } from "@/context/store";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { AddFriends, AllFriends } from "./";
import { Chat } from "../user";
import axios from "axios";

const Chats = () => {
  const [conversations, setConversations] = useState([]);
  const { user, setFriends } = state();
  const getChats = async () => {
    const newConversations = await Promise.all(
      user.conversationIds.map(async (id) => {
        const res = await axios.post("/api/conversations/allChats", {
          id: id,
        });
        return res.data.conversation || null;
      }),
    );
    setConversations(newConversations.filter((conversation) => conversation));
  };

  useEffect(() => {
    getChats();
  }, []);
  return (
    <div className="w-full h-full flex justify-start flex-col items-start gap-2 relative overflow-y-scroll">
      {conversations.length === 0 && (
        <div className="w-full h-full flex justify-center items-center flex-col gap-2">
          <div className="text-3xl font-semibold text-center font-serif">
            No conversations yet! Start a conversation
          </div>
          <div className="btn" onClick={() => setFriends(true)}>
            Friends
          </div>
        </div>
      )}
      {conversations.length !== 0 && (
        <div className="users">
          {conversations.map((chat) => (
            <Chat key={chat.id} conversation={chat} />
          ))}
        </div>
      )}
      <HiChatBubbleLeft
        size={50}
        className="absolute bottom-2 right-2 bg-gray-100 hover:bg-gray-200 
        text-zinc-600 hover:text-zinc-700 p-2 rounded-full cursor-pointer"
        onClick={() => setFriends(true)}
      />
    </div>
  );
};

export default Chats;
