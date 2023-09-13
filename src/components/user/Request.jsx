import { state } from "@/context/store";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Request = ({ RequestUser, refresh }) => {
  const { user } = state();
  const response = async (senderId, status) => {
    await axios.post("/api/friends/Response", {
      recieverId: user.id,
      senderId,
      status,
    });

    toast.success("Request has been " + status + "ed").toUpperCase();
    refresh();
  };
  const names = RequestUser.Name.split(" ");
  const firstLetter = names[0][0];
  const lastLetter = names[names.length - 1][0];
  return (
    <div className="user">
      {RequestUser?.image ? (
        <img
          src={RequestUser.image}
          className="w-[60px] h-[60px] rounded-full bg-gray-500 overflow-hidden object-cover"
        />
      ) : (
        <div className="rounded-full object-cover h-[60px] min-w-[60px] bg-blue-300 text-2xl font-bold font-serif flex justify-center items-center text-black">
          {firstLetter + lastLetter}
        </div>
      )}
      <div className="flex-grow ">
        <pre className=" text-base md:text-lg  heading_2">
          {RequestUser.Name}
        </pre>
        <pre className="heading_3 text-sm md:text-base">
          {RequestUser.about ? RequestUser.about : "Hey how are you!"}
        </pre>
      </div>
      <div className="flex justify-center items-center gap-2 p-2">
        <AiOutlineCloseCircle
          title="reject"
          size={30}
          className="btn p-1"
          onClick={() => response(RequestUser.id, "reject")}
        />
        <div
          className="btn w-fit py-[0.2rem] text-base font-thin"
          onClick={() => response(RequestUser.id, "block")}
        >
          Block
        </div>
        <div
          className="btn w-fit py-[0.2rem] text-base font-thin"
          onClick={() => response(RequestUser.id, "accept")}
        >
          Accept
        </div>
      </div>
    </div>
  );
};

export default Request;
