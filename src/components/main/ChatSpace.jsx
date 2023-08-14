import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { format, formatDistanceToNow, subDays } from "date-fns";
import { state } from "../../context/store";

import { Recieve, Send } from "../../containers";
import { HiArrowLeft, HiHand, HiMicrophone } from "react-icons/hi";
import { HiDocument } from "react-icons/hi2";
import { PusherCl } from "@/lib/pusher";
const ChatSpace = () => {
  const { user, currentChatUser, setIsOpen } = state();
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const getConversation = async () => {
    if (currentChatUser.id) {
      const anotherUser = currentChatUser.id;
      const userId = user.id;
      const res = await axios.post("/api/conversations/conversation", {
        userId,
        anotherUser,
      });
      if (res) {
        const messages = await res.data.messages;
        const id = await res.data.id;
        setConversationId(id);
        setConversation(messages || []);
      }
    }
  };
  useEffect(() => {
    getConversation();
    PusherCl.subscribe(conversationId);
    PusherCl.bind("message:new", getConversation);

    return () => {
      PusherCl.unbind("message:new", getConversation);
      PusherCl.unsubscribe(conversationId);
    };
  }, [currentChatUser, conversationId]);
  if (currentChatUser === "") {
    return (
      <div className="page">
        <div className="text-2xl font-semibold font-serif h-full w-full flex justify-center items-center  text-center">
          SELECT A CHAT OR START NEW CONVERSATION
        </div>
      </div>
    );
  }

  const lastSeen = formatDistanceToNow(
    subDays(new Date(currentChatUser.updatedAt), 0),
    new Date(),
    { addSuffix: true },
  );
  const SendMessage = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessage("");
    if (conversationId !== "") {
      const res = await axios.post("/api/conversations/messages", {
        message,
        senderId: user.id,
        conversationId,
      });
      if (res.status === 200) {
        setIsSent(true);
        return setTimeout(() => {
          setIsSending(false);
          setIsSent(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="page flex flex-col py-3 md:pb-5">
      <div className="bg-gradient w-full text-white z-20 p-2 flex justify-start items-center gap-2 ">
        <HiArrowLeft
          size={40}
          className="cursor-pointer hover:scale-105"
          onClick={() => setIsOpen(true)}
        />
        <Image
          width={500}
          height={500}
          alt="Default"
          className="rounded-full h-[60px] w-[60px]"
          src={
            currentChatUser.image === null
              ? "/DefaultUser.jpg"
              : currentChatUser.image
          }
        />
        <div className="flex justify-center items-start gap-1 flex-col ">
          <div className="text-xl uppercase font-bold text-white">
            {currentChatUser.Name}
          </div>
          <div className="text-base text-zinc-200">{lastSeen}</div>
        </div>
      </div>
      {conversation.length === 0 ? (
        <div className="w-full h-full FlexCenter text-xl font-serif font-bold">
          Say Hello <HiHand />
        </div>
      ) : (
        <div className="flex-grow w-full overflow-y-scroll  overflow-x-hidden relative">
          {conversation.map((message) => (
            <div
              className="w-full flex justify-center items-center gap-2 my-2 text-black text-lg relative"
              key={message.id}
            >
              {message.senderId === user.id && <Send message={message} />}
              {message.senderId !== user.id && <Recieve message={message} />}
            </div>
          ))}
        </div>
      )}
      <div className="relative">
        {isSending && (
          <div className="bg-transparent text-sm absolute -top-10 w-full  p-1 ">
            <div className=" bg-zinc-200 w-fit mx-auto p-2 rounded-full">
              {isSent ? "Sent" : "Sending..."}
            </div>
          </div>
        )}

        <div className="w-full p-2 flex justify-start items-center gap-2 bg-gradient ">
          <div className="w-[90%] bg-zinc-400 p-0.5 rounded-full hover:bg-zinc-300 flex justify-start items-center">
            <form
              className=" w-full flex justify-start items-center relative"
              onSubmit={(e) => SendMessage(e)}
            >
              <input
                placeholder="Type message "
                className="w-full p-2 text-lg font-medium rounded-full outline-0"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button
                className="btn absolute right-0.5 hover:right-1"
                style={{ borderRadius: "99999px" }}
                type="submit"
              >
                SEND
              </button>
            </form>
          </div>
          <HiMicrophone className="hover:scale-105 hover:border border-zinc-800  p-1 rounded-full cursor-pointer h-11 w-11 text-zinc-700" />
          <HiDocument className="hover:scale-105 hover:border border-zinc-800  p-1 rounded-full cursor-pointer h-11 w-11 text-zinc-700" />
        </div>
      </div>
    </div>
  );
};

export default ChatSpace;