import React from "react";
import { MdVideoCall } from "react-icons/md";
import { PiPhoneCallLight } from "react-icons/pi";
const Call = () => {
  const CallCount = [1, 2, 3, 4];
  return (
    <div className="user">
      <img
        src="/DefaultUser.jpg"
        className="w-[60px] h-[60px] rounded-full bg-gray-500 overflow-hidden object-cover"
      />
      <div className="flex-grow">
        <div className="heading_2">name</div>
        <div className="heading_3 text-zinc-700">@created </div>
      </div>
      <div className="flex justify-center items-center ">
        <PiPhoneCallLight className="icon" />
        <MdVideoCall className="icon" />
      </div>
    </div>
  );
};

export default Call;
