import Image from "next/image";
import React from "react";
import { modal, state } from "../context/store";

const User = ({ id, name, image, status, icon, NameClick, IconClick }) => {
  const { currentChatUser } = state();
  const { setImage } = modal();
  const isSelected = currentChatUser.id === id ? true : false;

  return (
    <div
      className="user"
      style={{
        ...(isSelected && { backgroundColor: "#919293", color: "gray" }),
      }}
    >
      <img
        src={image}
        alt={name}
        className="rounded-full object-cover h-[60px] w-[60px]"
        onClick={() => setImage(true)}
      />

      <div className="w-full" onClick={NameClick}>
        <div className="text-base md:text-lg heading_2">{name}</div>
        <div className="m-0 flex justify-start items-center gap-1 w-full whitespace-nowrap text-ellipsis overflow-hidden">
          <pre className="heading_3 text-sm md:text-base overflow-hidden w-full text-ellipsis">
            {status}
          </pre>
        </div>
      </div>
      <div className="icon" onClick={IconClick}>
        {icon}
      </div>
    </div>
  );
};

export default User;
