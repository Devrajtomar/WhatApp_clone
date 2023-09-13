import { modal } from "@/context/store";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiFillSetting, AiOutlineCloseCircle } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";
import { TbFriendsOff } from "react-icons/tb";
import Title from "./components/Title";
const ChatSettingModal = () => {
  const { ChatSetting, setChatSetting, setAccount } = modal();
  return (
    <>
      <Title title="Chat Settings" />
      <div className="mt-4 flex justify-start items-start gap-2 flex-col font-semibold text-xl text-zinc-900 p-1">
        <div className="flex items-center gap-1 bg-zinc-800 bg-opacity-30 hover:bg-white p-2 rounded-md w-full cursor-pointer">
          <BiBlock />
          Block
        </div>
        <div className="flex items-center gap-1 bg-zinc-800 bg-opacity-30 hover:bg-white p-2 rounded-md w-full cursor-pointer">
          <TbFriendsOff />
          Remove as friend
        </div>
        <div className="flex items-center gap-1 bg-zinc-800 bg-opacity-30 hover:bg-white p-2 rounded-md w-full cursor-pointer">
          <RiChatDeleteFill /> Clear Chats
        </div>
        <div
          className="flex items-center gap-1 bg-zinc-800 bg-opacity-30 hover:bg-white p-2 rounded-md w-full cursor-pointer"
          onClick={() => {
            setAccount(true);
            setChatSetting(false);
          }}
        >
          <AiFillSetting />
          Setting
        </div>
      </div>
    </>
  );
};

export default ChatSettingModal;
