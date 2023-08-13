import prisma from "../../../lib/prismaDB";

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
      const updatedConversations = await prisma.conversation.update({
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
          users: true,
          messages: {
            include: {
              seen: true,
            },
          },
        },
      });

      res.send("message has been send!");
    } catch (err) {
      res.send(err);
    }
  }
};
export default handler;
