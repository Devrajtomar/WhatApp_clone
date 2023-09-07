import React, { useEffect, useState } from "react";
import Story from "../user/Story";
import { GiMusicSpell } from "react-icons/gi";
import { modal, state } from "../../context/store";
import { User } from "@/containers";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { MdHistory } from "react-icons/md";

const Stories = () => {
  const { user } = state();
  const [AllStories, setAllStories] = useState([]);

  const GetStories = async () => {
    const res = await axios.post("/api/stories/AllStories", {
      user: user,
    });
    setAllStories(res.data);
  };
  useEffect(() => {
    GetStories();
  }, []);
  return (
    <div className="users">
      <div className="w-full h-fit flex justify-between items-center p-2">
        <div className="heading_2">Stories</div>
        <MdHistory className="btn_ min-w-[60px] p-0  rounded-sm" size={30} />
      </div>
      <Story User={user} />
      <hr className="h-1 w-full" />
      {AllStories.length !== 0 &&
        AllStories.map((user_) => (
          <Story User={user_} key={user_.id + user_.Name + "'s Stories"} />
        ))}
    </div>
  );
};

export default Stories;
