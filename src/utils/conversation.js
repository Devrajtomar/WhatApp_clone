import axios from "axios";

export default async ({ userId, otheruserId, setId, setChats }) => {
  if (otheruserId) {
    const res = await axios.post("/api/conversations/conversation", {
      userId,
      otheruserId,
    });
    if (res) {
      const messages = await res.data.messages;
      const id = await res.data.id;
      setId(id);
      setChats(messages || []);
    } else {
      setId(null);
      setChats([]);
    }
  }
};
