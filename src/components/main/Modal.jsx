import React from "react";
import { modal } from "@/context/store";
import {
  ImageModal,
  AccountModal,
  ChatSettingModal,
  UserSettingsModal,
  NewGroupModal,
} from "../models";
import NewStoryModal from "../models/NewStoryModal";
const Modal = () => {
  const { image, Account, ChatSetting, userSettings, NewGroup, NewStory } =
    modal();
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
  return (
    <div>
      {image && <ImageModal data={""} />}
      {Account && <AccountModal data={""} />}
      {ChatSetting && <ChatSettingModal data={""} />}
      {userSettings && <UserSettingsModal data={""} />}
      {NewGroup && <NewGroupModal data={""} />}
      {NewStory && <NewStoryModal data={""} />}
    </div>
  );
};

export default Modal;
