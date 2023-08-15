import { modal } from "@/context/store";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiFillSetting, AiOutlineCloseCircle } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";
import { TbFriendsOff } from "react-icons/tb";

const ChatSettingModal = () => {
  const { ChatSetting, setChatSetting, setAccount } = modal();
  return (
    <Transition appear show={ChatSetting} as={Fragment}>
      <Dialog as="div" onClose={() => setChatSetting(false)}>
        <div>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="modal" />
          </Transition.Child>
        </div>
        <div className="fixed inset-0 overflow-y-auto z-[99999]">
          <div className="flex min-h-full items-center justify-end text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-screen max-w-xs xl:max-w-md transform overflow-hidden bg-zinc-100 p-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="w-full p-1 text-xl font-semibold flex items-center justify-between">
                    <div>Chat Settings</div>
                    <AiOutlineCloseCircle
                      size={27}
                      onClick={() => setChatSetting(false)}
                      className="hover:bg-white hover:text-black hover:scale-105 cursor-pointer"
                    />
                  </div>
                </Dialog.Title>
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChatSettingModal;
