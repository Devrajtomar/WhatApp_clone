import React from "react";
import Story from "../user/Story";
import { GiMusicSpell } from "react-icons/gi";
import { modal } from "../../context/store";
import { User } from "@/containers";
import { BsThreeDotsVertical } from "react-icons/bs";

const Stories = () => {
  const { setNewStory } = modal();
  return (
    <div className="users">
      <div className="heading_2">Stories</div>
      <User
        name="Your Stories"
        icon={<BsThreeDotsVertical />}
        IconClick={() => {}}
      />
      <hr />
      <Story user={"test"} />
      <Story user={"test"} />
      <Story user={"test"} />
      <GiMusicSpell
        className="IconBottom"
        size={50}
        onClick={() => setNewStory(true)}
      />
    </div>
  );
};

export default Stories;
