import React, { useState, useEffect } from "react";
import AddFriend from "../user/AddFriend";
import axios from "axios";
import { HiUserAdd } from "react-icons/hi";
import { state } from "@/context/store";

const AddFriends = () => {
  const [users, setUsers] = useState([]);
  const { setAddFriends, userEmail } = state();

  const FetchUsers = async () => {
    console.log(userEmail);
    const data = await axios.get("/api/GetUsers", {
      headers: { Email: userEmail },
    });
    setUsers(data.data);
  };
  useEffect(() => {
    FetchUsers();
  }, []);
  return (
    <div className="users">
      <div
        className="w-full h-fit flex justify-between items-center p-2"
        onClick={() => setAddFriends(false)}
      >
        <div className="heading_2">Add Friends</div>
        <HiUserAdd className="btn w-fit" size={40} />
      </div>
      {users.map((user) => (
        <AddFriend key={user.id} user={user} />
      ))}
    </div>
  );
};

export default AddFriends;
