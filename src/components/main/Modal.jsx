import React from "react";
import { modal } from "@/context/store";
import {
  ImageModal,
  AccountModal,
  ChatSettingModal,
  UserSettingsModal,
  NewGroupModal,
} from "../models";
const Modal = () => {
  const { image, Account, ChatSetting, userSettings, NewGroup } = modal();
  if (!image && !Account && !ChatSetting && !userSettings && !NewGroup) {
    return null;
  }
  return (
    <div>
      {image && <ImageModal data={""} />}
      {Account && <AccountModal data={""} />}
      {ChatSetting && <ChatSettingModal data={""} />}
      {userSettings && <UserSettingsModal data={""} />}
      {NewGroup && <NewGroupModal data={""} />}
    </div>
  );
};

export default Modal;
