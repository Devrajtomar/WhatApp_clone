import axios from "axios";

export default async function ({ message, senderId, conversationId }) {
  if (conversationId !== null) {
    const res = await axios.post("/api/socket/newmessage", {
      message,
      senderId,
      conversationId,
    });
    return res.data;
  } else {
    return null;
  }
}
