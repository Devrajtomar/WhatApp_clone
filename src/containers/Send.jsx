import { format } from "date-fns";
import Image from "next/image";
import React from "react";

const Send = ({ message }) => {
  return (
    <div className="send">
      <div className="time">{format(new Date(message.createdAt), "p")}</div>
      <div className="bg-blue-300 message_">{message.body}</div>
      <div className="flex items-center justify-center w-10 h-10 rounded-b-full rounded-r-full -rotate-45 bg-blue-300 ml-2">
        <Image
          width={5000}
          height={5000}
          src="/DefaultUser.jpg"
          alt="Default"
          className="w-full h-full rounded-full bg-sky-200 rotate-45"
        />
      </div>
    </div>
  );
};

export default Send;
