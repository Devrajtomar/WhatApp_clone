import React, { useEffect, useState } from "react";
import { state } from "@/context/store";
import { HiChatAlt2, HiUserAdd } from "react-icons/hi";
import axios from "axios";
import Chat from "../user/Chat";
import { User } from "@/containers";

const AllFriends = () => {
  const [allFriends, setAllFriends] = useState([]);
  const {
    setAddFriends,
    setIsOpen,
    setChatUser,
    setFriends,
    setRequests,
    user,
  } = state();

  const fetchFriends = async () => {
    const res = await axios.post("/api/friends/AllFriends", { Id: user.id });
    setAllFriends(res.data);
  };

  useEffect(() => {
    fetchFriends();
  }, []);
  const NameClick = (user_) => {
    setIsOpen(window.innerWidth <= 800 ? false : true);
    setChatUser(user_);
  };
  const IconClick = (user_) => {
    setIsOpen(false);
    setChatUser(user_);
  };

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
      {allFriends.length !== 0 && (
        <div className="users">
          {allFriends.map((friend) => (
            <div className="w-full h-full">
              <User
                id={friend.sender.id}
                name={friend.sender.Name}
                status={
                  friend.sender.about !== null
                    ? friend.sender.about
                    : "Hey i'am using messanger!"
                }
                image={friend.sender.image}
                icon={<HiChatAlt2 />}
                NameClick={() => NameClick(friend.sender)}
                IconClick={() => IconClick(friend.sender)}
              />
            </div>
          ))}
        </div>
      )}
      {allFriends.length === 0 && (
        <div className="w-full h-full flex justify-center flex-col items-center gap-2 overflow-y-scroll">
          <div className="heading_1">You Have No Freinds .</div>
          <div className="w-full flex justify-center items-center gap-3">
            <div
              className="btn w-fit"
              onClick={() => {
                setRequests(true);
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
