import React from "react";
import Call from "../user/Call";
import { MdAddCall, MdCall, MdCallMade, MdHistory } from "react-icons/md";

const Calls = () => {
  return (
    <div className="users">
      <div className="w-full h-fit flex justify-between items-center p-2">
        <div className="heading_2">Calls</div>
        <MdHistory
          className="btn_ min-w-[60px] p-0  rounded-sm"
          size={30}
          onClick={() => {}}
        />
      </div>
      <Call />
      <Call />
      <Call />
      <Call />
      <MdAddCall className="IconBottom" size={50} />
    </div>
  );
};

export default Calls;
