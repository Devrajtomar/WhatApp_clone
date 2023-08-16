import Pusher from "pusher";
import PusherClient from "pusher-js";
export const PusherSr = new Pusher({
  appId: "1650972",
  key: "20ddf1bf3b962b594c58",
  secret: "dffeee08e7f8afc62866",
  cluster: "ap2",
  useTLS: true,
});
export const PusherCl = new PusherClient("20ddf1bf3b962b594c58", {
  cluster: "ap2",
});
