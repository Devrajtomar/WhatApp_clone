"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Loading from "../containers/Loading";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  let token = "";
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
  }
  const LogOut = () => {
    window.localStorage.removeItem("token");
    router.refresh();
  };
  useEffect(() => {
    if (token === null || token === "") {
      return router.push("/login");
    }
    if (token) {
      const fetchData = async () => {
        try {
          const res = await axios.post("/api/token", { token });
          const data_ = res.data;

          if (data_) {
            const user = await axios.post("/api/user", { data_ });
            const data = user.data;

            setData(data);
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
    return <Loading />;
  }
  return (
    <div className="home flex-col font-bold uppercase">
      <div>Home</div>
      <div>{data.name}</div>
      <pre className="btn" onClick={LogOut}>
        Log Out
      </pre>
    </div>
  );
};

export default Page;
