"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { SideBar } from "@/components/navigation";
import { ChatSpace, CallsSpace, Stories, Modal } from "@/components/main";
import { Logo } from "@/containers";
import { state } from "@/context/store";
import { useSocket } from "@/providers/socket-provider";

const Page = () => {
  const { setUser, user } = state();
  const { isConnected, socket } = useSocket();
  const [selectedTab, setSelectedTab] = useState("Chat");
  const router = useRouter();
  const [data, setData] = useState(null);

  let token = "";
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
  }
  useEffect(() => {
    if (token === null || token === "") {
      return router.push("/login");
    }
    if (token) {
      const fetchData = async () => {
        try {
          const user = await axios.post("/api/user", { token });
          const data = user.data;

          setData(data);
          setUser(data);
          if (!data.id) {
            router.push("/login");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          router.push("/login");
          toast.error(
            <h1 className="errBold text-rose-500">
              Something went wrong! Please login again...
            </h1>,
          );
        }
      };
      fetchData();
    } else {
      router.push("/login");
    }
  }, [token, router]);
  if (!data) {
    return (
      <div className="w-screen h-screen FlexCenter">
        <Logo />
      </div>
    );
  }

  return (
    <div className="home">
      <SideBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      {selectedTab === "Chat" && <ChatSpace />}
      {selectedTab === "Stories" && <Stories />}
      {selectedTab === "Calls" && <CallsSpace />}
      <Modal />
    </div>
  );
};

export default Page;
