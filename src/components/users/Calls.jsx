import React, { useState } from "react";
import Call from "../user/Call";
import { MdAddCall, MdCall, MdCallMade, MdHistory } from "react-icons/md";
import { state } from "@/context/store";
import { BsThreeDots } from "react-icons/bs";

const Calls = () => {
  const [page, setPage] = useState("history");
  const { user } = state();
  if (page === "history") {
    if (user.Calls.length === 0) {
      return (
        <div className="w-full h-full FlexCenter flex-col gap-2">
          <div className="heading_1">No Calls History</div>
          <div className="btn" onClick={() => setPage("makeCall")}>
            Make A Call
          </div>
        </div>
      );
    }
    return (
      <div className="users">
        <div className="w-full h-fit flex justify-between items-center p-2">
          <div className="heading_2">Calls</div>
          <BsThreeDots
            className="btn_ min-w-[60px] p-0  rounded-sm"
            size={30}
            onClick={() => {}}
          />
        </div>
        <MdAddCall
          className="IconBottom"
          size={50}
          onClick={() => setPage("makeCall")}
        />
      </div>
    );
  }
  if (page === "makeCall") {
    return (
      <div className="users">
        <div className="w-full h-fit flex justify-between items-center p-2">
          <div className="heading_2">Calls</div>
          <div className="btn" size={30} onClick={() => setPage("history")}>
            Back
          </div>
        </div>
        {user.friends.map((user_) => (
          <Call user={user_} status={user_.about || "Hey Fuck You"} />
        ))}
      </div>
    );
  }
};

export default Calls;
