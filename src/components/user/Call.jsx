import { state } from "@/context/store";
import axios from "axios";
import { set } from "date-fns";
import React from "react";
import { MdVideoCall } from "react-icons/md";
import { PiPhoneCallLight } from "react-icons/pi";
const Call = ({ user, status }) => {
  const { setIsOpen } = state();
  const handelClick = () => {
    if (window.innerWidth <= 800) {
      return setIsOpen(false);
    }
  };
  return (
    <div className="user" onClick={handelClick}>
      <img
        src={user.image ? user.image : "/DefaultUser.jpg"}
        className="w-[60px] h-[60px] rounded-full bg-gray-500 overflow-hidden object-cover"
      />
      <div className="flex-grow">
        <div className="heading_2">{user.Name}</div>
        <div className="heading_3 text-zinc-700">{status}</div>
      </div>
      <div className="flex justify-center items-center ">
        <PiPhoneCallLight className="icon" />
        <MdVideoCall className="icon" />
      </div>
    </div>
  );
};

export default Call;
