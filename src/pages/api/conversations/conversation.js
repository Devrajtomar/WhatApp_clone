import prisma from "../../../lib/prismaDB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { userId, otheruserId } = req.body;
      const response = await prisma.conversation.findMany({
        where: {
          OR: [
            {
              userIds: {
                equals: [otheruserId, userId],
              },
            },
            {
              userIds: {
                equals: [userId, otheruserId],
              },
            },
          ],
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
          messages: true,
        },
      });
      if (response.length !== 0) {
        res.send(response[0]);
      }

      if (response.length === 0) {
        const newConversation = await prisma.conversation.create({
          data: {
            users: {
              connect: [
                {
                  id: userId,
                },
                {
                  id: otheruserId,
                },
              ],
            },
          },
          include: {
            users: true,
            messages: {
              include: {
                sender: true,
                seen: true,
              },
            },
          },
        });
        res.send(newConversation);
      }
    } catch (err) {
      res.send(err);
    }
  } else {
    res.status(500).message("Fuck off");
  }
};
export default handler;
