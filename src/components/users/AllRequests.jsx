import React, { useEffect, useState } from "react";
import { state } from "@/context/store";
import { HiUserAdd } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { User } from "../../containers";
import axios from "axios";

const AllRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const { setAddFriends, setFriends, setRequests, Friends, user } = state();

  const fetchRequests = async () => {
    const res = await axios.post("/api/friends/Requests", { Id: user.id });
    setAllRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const response = async (senderId, status) => {
    const res = await axios.post("/api/friends/Response", {
      recieverId: user.id,
      senderId,
      status,
    });
    fetchRequests();
  };

  return (
    <div className="w-full h-full p-2">
      <div className="w-full h-fit flex justify-between items-center p-2">
        <div className="heading_2">Friends Requests</div>
        <div className="FlexCenter gap-2">
          <div className="btn p-2 w-fit" onClick={() => setRequests(false)}>
            BACK
          </div>
          <HiUserAdd
            className="btn w-fit"
            size={32}
            onClick={() => {
              setAddFriends(true);
              setRequests(false);
            }}
          />
        </div>
      </div>
      {allRequests.length !== 0}
      {
        <div className="users">
          {allRequests?.map((request) => (
            <User
              key={request.id + "reequest"}
              name={request.sender.Name}
              image={request.sender.image}
              status={
                request.sender.about ? request.sender.about : "Hey how are you!"
              }
              icon={
                <div className="flex justify-center items-center gap-2">
                  <AiOutlineCloseCircle
                    title="reject"
                    size={30}
                    className="btn p-1"
                    onClick={() => response(request.senderId, "reject")}
                  />
                  <div
                    className="btn w-fit py-[0.2rem] text-base font-thin"
                    onClick={() => response(request.senderId, "block")}
                  >
                    Block
                  </div>
                  <div
                    className="btn w-fit py-[0.2rem] text-base font-thin"
                    onClick={() => response(request.sender.id, "accept")}
                  >
                    Accept
                  </div>
                </div>
              }
            />
          ))}
        </div>
      }
      {allRequests.length === 0 && (
        <div className="w-full h-full flex justify-center flex-col items-center gap-2 overflow-y-scroll">
          <div className="heading_1">You Have No Requests .</div>
          <div className="w-full flex justify-center items-center gap-3">
            <div
              className="btn w-fit"
              onClick={() => {
                setAddFriends(true);
                setRequests(false);
              }}
            >
              Add friends
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRequests;
