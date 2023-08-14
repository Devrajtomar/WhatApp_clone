import Image from "next/image";
import React from "react";
import { format } from "date-fns";
const Recieve = ({ message }) => {
  return (
    <div className="recieve">
      <div className="flex items-center justify-center w-10 h-10 rounded-t-full rounded-l-full -rotate-45 bg-green-300">
        <Image
          width={5000}
          height={5000}
          src="/DefaultUser.jpg"
          alt="Default"
          className="w-full h-full rounded-full bg-blue-100 rotate-45"
        />
      </div>
      <div className="bg-green-400 message_">{message.body}</div>
      <div className="time">{format(new Date(message.createdAt), "p")}</div>
    </div>
  );
};

export default Recieve;
