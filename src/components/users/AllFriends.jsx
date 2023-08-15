import React, { useState } from "react";
import { state } from "@/context/store";
import { HiUserAdd } from "react-icons/hi";

const AllFriends = () => {
  const [allFriends, setAllFriends] = useState([]);
  const { setAddFriends, setFriends } = state();
  return (
    <div className="w-full h-full p-2">
      <div className="w-full h-fit flex justify-between items-center p-2">
        <div className="heading_2">Friends</div>
        <div className="FlexCenter gap-2">
          <div className="btn p-2 w-fit" onClick={() => setFriends(false)}>
            BACK
          </div>
          <HiUserAdd
            className="btn w-fit"
            size={32}
            onClick={() => {
              setAddFriends(true);
              setFriends(false);
            }}
          />
        </div>
      </div>
      {allFriends.length === 0 && (
        <div className="w-full h-full flex justify-center flex-col items-center gap-2 overflow-y-scroll">
          <div className="heading_1">You Have No Freinds .</div>
          <div className="w-full flex justify-center items-center gap-3">
            <div
              className="btn w-fit"
              onClick={() => {
                setAddFriends(true);
                setFriends(false);
              }}
            >
              Friend Requests
            </div>
            <div
              className="btn w-fit"
              onClick={() => {
                setAddFriends(true);
                setFriends(false);
              }}
            >
              Add friends
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllFriends;
