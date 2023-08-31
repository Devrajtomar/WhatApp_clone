import Image from "next/image";
import React from "react";
import { modal, state } from "../context/store";

const User = ({ id, name, image, status, icon, NameClick, IconClick }) => {
  const { currentChatUser } = state();
  const { setImage } = modal();
  const isSelected = currentChatUser.id === id ? true : false;

  const names = name.split(" ");
  const firstLetter = names[0][0];
  const lastLetter = names[names.length - 1][0];

  return (
    <div
      className="user"
      style={{
        ...(isSelected && { backgroundColor: "#919293", color: "gray" }),
      }}
    >
      {image ? (
        <Image
          src={image ? image : "/DefaultUser.jpg"}
          alt={name}
          height="60"
          width="60"
          className="rounded-full object-cover h-[60px] w-[60px]"
          onClick={() => setImage(true)}
        />
      ) : (
        <div
          className="rounded-full object-cover h-[60px] min-w-[60px] bg-blue-300 text-2xl font-bold font-serif flex justify-center items-center text-black"
          onClick={() => setImage(true)}
        >
          {firstLetter + lastLetter}
        </div>
      )}
      <div className="w-full" onClick={NameClick}>
        <div className="text-base md:text-lg heading_2">{name}</div>
        <div className="m-0 flex justify-start items-center gap-1 w-full whitespace-nowrap text-ellipsis overflow-hidden">
          <pre className="heading_3 text-sm md:text-base">{status}</pre>
        </div>
      </div>
      <div className="icon" onClick={IconClick}>
        {icon}
      </div>
    </div>
  );
};

export default User;
