import React from "react";
import { GiMusicSpell } from "react-icons/gi";
import { modal, state } from "../../context/store";
import { User } from "@/containers";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdHistory } from "react-icons/md";

const Story = ({ User }) => {
  const { user, currentStoryUser, setStoryUser } = state();
  const { setNewStory } = modal();
  const Click = (user_) => {
    if (User.id === user.id && User?.Stories?.length === 0) {
      return setNewStory(true);
    }
    if (User.id !== user.id || User?.Stories?.length !== 0) {
      return setStoryUser(user_);
    }
  };
  const LastStory = User.Stories[User.Stories.length - 1];
  console.log(LastStory);
  const isSelected = currentStoryUser?.id === User.Id ? true : false;
  return (
    <div
      className="user"
      style={{
        ...(isSelected && { backgroundColor: "#919293", color: "gray" }),
      }}
      onClick={() => Click(User)}
    >
      {User.id === user.id && User?.Stories?.length === 0 ? (
        <img
          src={user.image ? user.image : "/DefaultUser.jpg"}
          className="rounded-full object-cover h-[60px] w-[60px]"
        />
      ) : LastStory?.type === "video" ? (
        <video
          src={LastStory.DataUrl}
          className="rounded-full object-cover h-[60px] w-[60px]"
        />
      ) : (
        <img
          src={LastStory.DataUrl}
          alt={LastStory.id}
          height="60"
          width="60"
          className="rounded-full object-cover h-[60px] w-[60px]"
        />
      )}
      <div className="w-full">
        <div className="text-base md:text-lg heading_2">{User.Name}</div>
        <div className="m-0 flex justify-start items-center gap-1 w-full whitespace-nowrap text-ellipsis overflow-hidden">
          <pre className="heading_3 text-sm md:text-base">Last Story Time</pre>
        </div>
      </div>
      <BsThreeDotsVertical className="icon" onClick={() => {}} />
    </div>
  );
};

export default Story;
