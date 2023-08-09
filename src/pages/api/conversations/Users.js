import prisma from "../../../lib/prismaDB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { userId, userId_ } = req.body;
      const newConversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [{ id: userId }, { id: userId_ }],
          },
        },
      });
      res.send(newConversation);
    } catch (err) {
      res.send({ err, massage: "somthing happend" });
    }
  }
};
