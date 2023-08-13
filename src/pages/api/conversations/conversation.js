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
          users: true,
          messages: true,
        },
      });
      if (response.length !== 0) {
        res.send(response[0]);
      } else {
        res.send([]);
      }
    } catch (err) {
      res.send(err);
    }
  }
};
export default handler;
