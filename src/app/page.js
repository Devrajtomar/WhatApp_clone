"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { SideBar } from "../components/navigation";
import { ChatSpace, CallsSpace, Stories, Modal } from "../components/main";
import { Loading } from "../containers";
import { state } from "@/context/store";
import "../styles/jitsi.css";

const Page = () => {
  const { setUser } = state();
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
        } catch (error) {
          //console.error("Error fetching data:", error);
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
    return <Loading />;
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
