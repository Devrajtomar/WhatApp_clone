import { Dialog } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { modal } from "../../../context/store";
const Title = ({ title, onClose }) => {
  const {
    setImage,
    setAccount,
    setChatSetting,
    setUserSetting,
    setNewGroup,
    setNewStory,
  } = modal();
  const handelClose = () => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      setImage(false);
      setAccount(false);
      setChatSetting(false);
      setUserSetting(false);
      setNewGroup(false);
      setNewStory(false);
    }
  };
  return (
    <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900"
    >
      <div className="w-full p-1 text-xl font-semibold flex items-center justify-between">
        <div>{title}</div>
        <AiOutlineCloseCircle
          size={27}
          onClick={handelClose}
          className=" hover:scale-105 cursor-pointer bg-transparent"
        />
      </div>
    </Dialog.Title>
  );
};

export default Title;
