import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";
import newmessage from "../utils/newmessage";
const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const io = res.socket.server.io;
      const { message, conversationId, senderId } = req.body;
      try {
        const newMessage = await newmessage({
          message,
          id: conversationId,
          senderId,
        });

        res?.socket?.server?.io?.emit("new message", newMessage);

        res.send(newMessage);

        await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            lastMessageAt: new Date(),
            messages: {
              connect: {
                id: newMessage.id,
              },
            },
          },
        });
      } catch (err) {
        console.log("Err" + err);
        res.send("Err" + err + res.socket.server.io);
      }
    });
  }
};

export default handler;
