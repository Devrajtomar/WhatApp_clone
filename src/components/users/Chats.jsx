import React, { useEffect, useState } from "react";
import Chat_ from "../user/Chat";
import axios from "axios";
import { state } from "@/context/store";
import { AddFriends } from "./";
import { HiUserAdd } from "react-icons/hi";
const Chats = () => {
  const [friends, setFriends] = useState([]);
  const { addFriends, setAddFriends } = state();
  if (friends.length === 0 && addFriends === false) {
    return (
      <div className="w-full min-h-full flex justify-center flex-col items-center gap-2">
        <div className="heading_1">You Have No Freinds .</div>
        <div className="w-full flex justify-center items-center gap-3">
          <div className="btn w-fit" onClick={() => setAddFriends(true)}>
            Friend Requests
          </div>
          <div className="btn w-fit" onClick={() => setAddFriends(true)}>
            Add friends
          </div>
        </div>
      </div>
    );
  }
  if (addFriends) {
    return <AddFriends />;
  }
  return (
    <div className="users">
      <div
        className="w-full h-fit flex justify-between items-center p-2"
        onClick={() => setAddFriends(false)}
      >
        <div className="heading_2">Add Friends</div>
        <HiUserAdd className="btn w-fit" size={40} />
      </div>
      {friends.map((user) => (
        <Chat_ key={user.Email} user={user} />
      ))}
    </div>
  );
};

export default Chats;
