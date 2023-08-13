"use client";
import Image from "next/image";
import UpdatedAt from "../../utils/UpdatedAt.js";
import { HiUserAdd } from "react-icons/hi";
import { state } from "../../context/store.js";
import axios from "axios";
import { formatDistanceToNow, subDays } from "date-fns";

const AddFriend = ({ userData }) => {
  const { setIsOpen, setChatUser, user } = state();
  const lastSeen = formatDistanceToNow(
    subDays(new Date(userData.updatedAt), 0),
    new Date(),
    { addSuffix: true },
  );
  const createConversation = async () => {
    const anotherUser = userData.id;
    const userId = user.id;
    const res = await axios.post("/api/conversations/NewConversation", {
      userId,
      anotherUser,
    });
  };

  return (
    <div
      className="user"
      onClick={() => {
        setIsOpen(() => {
          if (window.innerWidth >= 800) {
            return false;
          } else {
            return true;
          }
        });
        setChatUser(userData);
        createConversation(userData.id);
      }}
    >
      <Image
        width={500}
        height={500}
        objectFit="cover"
        alt="Default"
        className="rounded-full h-[60px] w-[60px]"
        src={user.image === null ? "/DefaultUser.jpg" : user.image}
      />
      <div className="w-full ">
        <h3 className="text-base md:text-lg heading_2 ">{userData.Name}</h3>
        <pre className="heading_3 text-sm md:text-base">{lastSeen}</pre>
      </div>
      <pre className="btn_ w-fit p-2 rounded hidden md:block mr-3">
        Add Friend
      </pre>
      <HiUserAdd
        className="btn_ p-1 w-10 h-10 rounded-full md:hidden mr-3"
        size={30}
      />
    </div>
  );
};

export default AddFriend;
