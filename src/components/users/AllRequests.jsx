import React, { useEffect, useState } from "react";
import { state } from "@/context/store";
import { HiUserAdd } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { User } from "../../containers";
import axios from "axios";
import Request from "../user/Request";

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
            size={35}
            onClick={() => {
              setAddFriends(true);
              setRequests(false);
            }}
          />
        </div>
      </div>
      {allRequests.length !== 0 && (
        <div className="users">
          {allRequests?.map((request) => (
            <Request RequestUser={request.Sender} refresh={fetchRequests} />
          ))}
        </div>
      )}
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
