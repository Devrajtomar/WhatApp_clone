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
const SideBar = ({ selectedTab, setSelectedTab }) => {
  const { setUserSetting } = modal();
  const { user, isOpen, setIsOpen, Friends, addFriends, Requests } = state();

  if (isOpen) {
    return (
      <div className="SideBar">
        <div className="SideBar_icons">
          <div className=" justify-center items-center p-1 gap-1 flex-col hidden md:flex">
            <HiOutlineMenu className="icon" onClick={() => setIsOpen(false)} />
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
              <div>Chat</div>
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
              <div>Stories</div>
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
              <div>Calls</div>
            </div>
            {selectedTab === "Calls" && (
              <div className="w-full h-1 bg-zinc-800 rounded-sm" />
            )}
          </div>
          <div className="relative self-center justify-self-end hidden sm:block">
            {/* <div className="bg-green-300 border border-white absolute top-0.5 right-0.5 w-5 h-5 rounded-full" /> */}
            <Image
              width="60"
              height="60"
              alt="Default"
              className="rounded-full md:h-[60px] md:w-[60px] sm:w-[40px] sm:h-[40px] sm:mr-3 m-1 hidden sm:block"
              src={user.image}
              onClick={() => setUserSetting(true)}
            />
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
