import prisma from "../../../lib/prismaDB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const user = data.userId;
      const anotherUser = data.anotherUser;
      const response = await prisma.conversation.findMany({
        where: {
          OR: [
            {
              userIds: {
                equals: [anotherUser, user],
              },
            },
            {
              userIds: {
                equals: [user, anotherUser],
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
                  id: data.userId,
                },
                {
                  id: data.anotherUser,
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
