import Image from "next/image";
import React from "react";

const Recieve = ({ message }) => {
  return (
    <div className="recieve">
      <div className="flex items-center justify-center w-10 h-10 rounded-t-full rounded-l-full -rotate-45 bg-green-300 mr-2">
        <Image
          width={5000}
          height={5000}
          objectFit="cover"
          src="/DefaultUser.jpg"
          alt="Default"
          className="w-full h-full rounded-full bg-blue-100 rotate-45"
        />
      </div>
      <div className="bg-green-500 message_">{message}</div>
      <div className="time">10:50</div>
    </div>
  );
};

export default Recieve;
