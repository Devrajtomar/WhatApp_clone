"use client";

import React, { useState, useEffect } from "react";
import AddFriend from "../user/AddFriend";
import axios from "axios";
import { HiUserAdd } from "react-icons/hi";
import { state } from "@/context/store";

const AddFriends = () => {
  const [users, setUsers] = useState([]);
  const { addFriends, setAddFriends, user } = state();

  const FetchUsers = async () => {
    const data = await axios.get("/api/GetUsers", {
      headers: { Email: user.Email },
    });
    setUsers(data.data);
  };
  useEffect(() => {
    FetchUsers();
  }, []);

  if (addFriends)
    return (
      <div className="users">
        <div className="w-full h-fit flex justify-between items-center p-2">
          <div className="heading_2">Add Friends</div>
          <div className="FlexCenter gap-2">
            <div className="btn p-2 w-fit" onClick={() => setAddFriends(false)}>
              BACK
            </div>
            <HiUserAdd
              className="btn w-fit"
              size={32}
              onClick={() => setAddFriends(false)}
            />
          </div>
        </div>

        {users.map((friend) => (
          <AddFriend key={friend.id} userData={friend} />
        ))}
      </div>
    );
};

export default AddFriends;
