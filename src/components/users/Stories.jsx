import React, { useEffect, useState } from "react";
import Story from "../user/Story";
import { modal, state } from "../../context/store";
import axios from "axios";
import { MdHistory, MdScreenShare } from "react-icons/md";

const Stories = () => {
  const { user } = state();
  const [AllStories, setAllStories] = useState([]);
  const { setNewStory } = modal();
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
      <MdScreenShare
        size={50}
        className="IconBottom"
        onClick={() => setNewStory(true)}
      />
      <div className="w-full h-fit flex justify-between items-center p-1 mt-2">
        <div className="heading_2">Stories</div>
        <MdHistory className="btn_ min-w-[60px] p-0  rounded-sm" size={30} />
      </div>
      <Story User={user} />
      <hr className="h-1 w-full" />
      {AllStories.length !== 0 &&
        AllStories.map((user_) => {
          if (user_.Stories.length !== 0) {
            return (
              <Story User={user_} key={user_.id + user_.Name + "'s Stories"} />
            );
          }
        })}
    </div>
  );
};

export default Stories;
