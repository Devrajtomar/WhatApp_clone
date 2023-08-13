import React, { useState } from "react";

import { HiOutlineMenu } from "react-icons/hi";
import { AiFillPlaySquare } from "react-icons/ai";
import Image from "next/image";
import { HiChatBubbleBottomCenter, HiPhone } from "react-icons/hi2";

import { LogOut } from ".";
import { Chats, Stories, Calls, AddFriends, AllFriends } from "../users";
import { state } from "../../context/store";
const SideBar = ({ selectedTab, setSelectedTab }) => {
  const { isOpen, setIsOpen, Friends, addFriends } = state();

  if (isOpen) {
    return (
      <div className="SideBar">
        <div className="sidebar_icons">
          <div className="SideBar_icons">
            <div className=" justify-center items-center p-1 gap-1 flex-col hidden md:flex">
              <HiOutlineMenu
                className="icon"
                onClick={() => setIsOpen(false)}
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
                <HiChatBubbleBottomCenter className="text-2xl xl:text-3xl" />
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
                onClick={() => {
                  setSelectedTab("Stories");
                }}
              >
                <AiFillPlaySquare className="text-2xl xl:text-3xl" />
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
                <HiPhone className="text-2xl xl:text-3xl" />
                <div>Calls</div>
              </div>
              {selectedTab === "Calls" && (
                <div className="w-full h-1 bg-zinc-800 rounded-sm" />
              )}
            </div>
            <div className="hidden md:block">
              <LogOut />
            </div>
          </div>
          <div className="relative">
            <div className="bg-green-400 border border-white absolute top-0.5 right-0.5 w-5 h-5 rounded-full" />
            <Image
              width={7000}
              height={7000}
              alt="Default"
              className="rounded-full h-[60px] w-[60px] m-1 hidden sm:block"
              src="/DefaultUser.jpg"
            />
          </div>
        </div>
        <div className="SideBar_Menu">
          <hr className="w-screen md:hidden" />
          {selectedTab === "Chat" && (
            <div className="w-full h-full">
              {addFriends && <AddFriends />}
              {Friends && <AllFriends />}
              {!addFriends && !Friends && <Chats />}
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
