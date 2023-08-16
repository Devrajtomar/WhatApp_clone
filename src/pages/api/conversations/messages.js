import prisma from "../../../lib/prismaDB";
import { PusherSr } from "../../../lib/pusher";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const message = req.body.message;
    const conversationId = req.body.conversationId;
    const senderId = req.body.senderId;
    try {
      const newMessage = await prisma.message.create({
        data: {
          body: message,
          conversation: {
            connect: {
              id: conversationId,
            },
          },
          sender: {
            connect: {
              id: senderId,
            },
          },
          seen: {
            connect: {
              id: senderId,
            },
          },
        },
        include: {
          seen: true,
          sender: true,
        },
      });
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
        include: {
          users: {
            select: {
              id: true,
              Name: true,
              image: true,
              updatedAt: true,
            },
          },
          messages: {
            include: {
              seen: true,
            },
          },
        },
      });

      res.send("message has been send!");
      await PusherSr.trigger(conversationId, "message:new", newMessage);
    } catch (err) {
      res.send(err);
    }
  }
};
export default handler;
