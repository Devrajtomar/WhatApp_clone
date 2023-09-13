import { modal } from "@/context/store";
import { Dialog, Transition } from "@headlessui/react";
import {
  ImageModal,
  AccountModal,
  ChatSettingModal,
  UserSettingsModal,
  NewGroupModal,
  NewStoryModal,
} from "@/components/models";
import { Fragment, useState } from "react";

const Modal = () => {
  const { image, Account, ChatSetting, userSettings, NewGroup, NewStory } =
    modal();
  const {
    setImage,
    setAccount,
    setChatSetting,
    setUserSetting,
    setNewGroup,
    setNewStory,
  } = modal();
  const handelClose = () => {
    setImage(false);
    setAccount(false);
    setChatSetting(false);
    setUserSetting(false);
    setNewGroup(false);
    setNewStory(false);
  };
  if (
    !image &&
    !Account &&
    !ChatSetting &&
    !userSettings &&
    !NewGroup &&
    !NewStory
  ) {
    return null;
  }
  const isOpen =
    !image ||
    !Account ||
    !ChatSetting ||
    !userSettings ||
    !NewGroup ||
    !NewStory;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={handelClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center md:px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-screen h-screen md:min-h-[400px] md:max-h-[80vh] md:max-w-xl md:min-w-[400px] transform overflow-scroll bg-white p-3 text-left align-top shadow-xl transition-all">
                <div className="w-full h-full">
                  {image && <ImageModal data={""} />}
                  {Account && <AccountModal data={""} />}
                  {ChatSetting && <ChatSettingModal data={""} />}
                  {userSettings && <UserSettingsModal data={""} />}
                  {NewGroup && <NewGroupModal data={""} />}
                  {NewStory && <NewStoryModal data={""} />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
