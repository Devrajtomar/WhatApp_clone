import { useEffect } from "react";
import { useSocket } from "../providers/socket-provider";

export default async ({ key, setAfter }) => {
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("new message", (message) => {
      console.log("message");
      setAfter((current) => [...current, message]);
    });
    return () => {
      socket.off(key);
    };
  }, []);
};
