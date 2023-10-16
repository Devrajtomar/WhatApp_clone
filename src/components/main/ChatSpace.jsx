import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../providers/socket-provider";
import seen from "../../utils/seen";
import { modal, state } from "../../context/store";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Recieve, Send } from "../../containers";
import { HiHand, HiMicrophone } from "react-icons/hi";
import { HiChevronLeft, HiDocument } from "react-icons/hi2";
import getConversation from "../../utils/conversation";
import { DotPulse } from "@uiball/loaders";
import newMessage from "../../utils/newmessage";
import Empty from "../Empty/Empty";
import ChatSocket from "@/utils/chat-socket";

const ChatSpace = () => {
  // constant states
  const { socket } = useSocket();
  const { user, currentChatUser, isOpen, setIsOpen } = state();
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const { setChatSetting, setAccount } = modal();
  const chatContainerRef = useRef(null);

  ChatSocket({
    key: `new message ${conversationId}`,
    setAfter: setConversation,
  });

  useEffect(() => {
    if (currentChatUser !== null) {
      getConversation({
        userId: user.id,
        otheruserId: currentChatUser.id,
        setId: setConversationId,
        setChats: setConversation,
      });
    }
  }, [currentChatUser]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const SendMessage = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const res = await newMessage({
      senderId: user.id,
      message,
      conversationId,
    });

    if (res) {
      setIsSending(false);
    }
  };

  //updatings states

  //useEffects

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  //useEffects

  if (currentChatUser === null) {
    return <Empty text="select a chat or start new conversation" />;
  }
  return (
    <div className="page flex flex-col ">
      <div className="bg-gradient w-full text-white z-20 p-2 flex justify-between items-center gap-2 ">
        <div className="flex justify-start items-center gap-2 ">
          <HiChevronLeft
            size={35}
            className={`cursor-pointer hover:scale-105 ${
              isOpen ? "hidden" : ""
            }`}
            onClick={() => setIsOpen(true)}
          />
          <img
            alt="Default"
            className="rounded-full h-[50px] w-[50px]"
            src={currentChatUser.image}
          />
          <div
            className="flex justify-center items-start md:gap-1 flex-col "
            onClick={() => setAccount(true)}
          >
            <div className="text-base md:text-xl uppercase font-bold text-white">
              {currentChatUser.Name}
            </div>
            <div className="text-sm  md:text-base text-zinc-200">
              {seen(currentChatUser.updatedAt)}
            </div>
          </div>
        </div>
        <BsThreeDotsVertical
          size={37}
          onClick={() => setChatSetting(true)}
          className="hover:bg-gray-100 hover:text-black rounded-full cursor-pointer p-1"
        />
      </div>
      {conversation.length === 0 ? (
        <div className="w-full h-full FlexCenter text-xl font-serif font-bold">
          Say Hello <HiHand />
        </div>
      ) : (
        <div
          className="flex-grow w-full overflow-y-scroll  overflow-x-hidden relative"
          ref={chatContainerRef}
        >
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
            <div className=" w-fit mx-auto">
              <DotPulse size={20} speed={1} color="black" />
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
