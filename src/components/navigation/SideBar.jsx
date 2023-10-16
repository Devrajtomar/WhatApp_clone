import React, { useState } from "react";

import { HiOutlineMenu } from "react-icons/hi";
import { AiFillPlaySquare } from "react-icons/ai";
import Image from "next/image";
import { HiChatBubbleBottomCenter, HiPhone } from "react-icons/hi2";

import { LogOut } from ".";
import {
  Chats,
  Stories,
  Calls,
  AddFriends,
  AllFriends,
  AllRequests,
} from "../users";
import { modal, state } from "../../context/store";
import axios from "axios";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
const SideBar = ({ selectedTab, setSelectedTab }) => {
  const { setUserSetting } = modal();
  const { user, isOpen, setIsOpen, Friends, addFriends, Requests } = state();

  if (isOpen) {
    return (
      <div className="SideBar">
        <div className="SideBar_icons">
          <div className=" p-1 ">
            <MdSettings
              className="text-2xl hover:scale-105 hover:text-zinc-700"
              onClick={() => setUserSetting(true)}
            />
          </div>
          <div>
            <div
              className={`${
                selectedTab === "Chat" ? "selected_Icon" : "page_icons"
              }`}
              onClick={() => {
                setSelectedTab("Chat");
              }}
            >
              <HiChatBubbleBottomCenter className="text-2xl" />
              <div className="md:hidden">Chat</div>
            </div>
            {selectedTab === "Chat" && (
              <div className="w-full h-1 bg-zinc-800 rounded-sm" />
            )}
          </div>
          <div>
            <div
              className={`${
                selectedTab === "Stories" ? "selected_Icon" : "page_icons"
              }`}
              onClick={() => setSelectedTab("Stories")}
            >
              <AiFillPlaySquare className="text-2xl" />
              <div className="md:hidden">Stories</div>
            </div>
            {selectedTab === "Stories" && (
              <div className="w-full h-1 bg-zinc-800 rounded-sm" />
            )}
          </div>
          <div>
            <div
              className={`${
                selectedTab === "Calls" ? "selected_Icon" : "page_icons"
              }`}
              onClick={() => {
                setSelectedTab("Calls");
              }}
            >
              <HiPhone className="text-2xl" />
              <div className="md:hidden">Calls</div>
            </div>
            {selectedTab === "Calls" && (
              <div className="w-full h-1 bg-zinc-800 rounded-sm" />
            )}
          </div>
          <div className="relative self-center justify-self-end hidden sm:block mt-auto">
            <LogOut />
          </div>
        </div>
        <div className="SideBar_Menu">
          <hr className="w-screen md:hidden" />
          {selectedTab === "Chat" && (
            <div className="w-full h-full">
              {addFriends && <AddFriends />}
              {Friends && <AllFriends />}
              {Requests && <AllRequests />}
              {!addFriends && !Friends && !Requests && <Chats />}
            </div>
          )}
          {selectedTab === "Stories" && <Stories />}
          {selectedTab === "Calls" && <Calls />}
        </div>
      </div>
    );
  }
};

export default SideBar;
