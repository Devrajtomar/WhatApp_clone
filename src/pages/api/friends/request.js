import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const recieverId = req.body.recieverId;
      const senderId = req.body.senderId;
      const requests = await prisma.request.findMany({
        where: {
          AND: {
            senderId,
            recieverId,
          },
        },
      });
      if (requests.length === 0) {
        try {
          const newRequest = await prisma.request.create({
            data: {
              recieverId: recieverId,
              senderId: senderId,
            },
            include: {
              sender: {
                select: {
                  id: true,
                  Name: true,
                  image: true,
                  updatedAt: true,
                },
              },
            },
          });
          res.send(newRequest);
          const user1 = await prisma.user.update({
            where: {
              id: senderId,
            },
            data: {
              FriendRequests: newRequest,
            },
          });
          const user2 = await prisma.user.update({
            where: {
              id: recieverId,
            },
            data: {
              FriendRequests: newRequest,
            },
          });
        } catch (err) {
          res.send(err);
        }
      } else {
        res.send("Request already exist");
      }
    });
  }
};

export default handler;
