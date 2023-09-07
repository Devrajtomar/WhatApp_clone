import { data } from "autoprefixer";
import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const recieverId = req.body.recieverId;
      const senderId = req.body.senderId;
      const status = req.body.status;
      const requests = await prisma.request.findMany({
        where: {
          AND: {
            SenderId: senderId,
            RecieverId: recieverId,
          },
        },
      });
      await prisma.request.update({
        where: {
          id: requests[0].id,
        },
        data: {
          IsAccepted: status === "accept" ? true : false,
          IsBlocked: status === "block" ? true : false,
        },
      });
      if (status === "accept") {
        await prisma.user.update({
          where: {
            id: senderId,
          },
          data: {
            friends: {
              connect: {
                id: recieverId,
              },
            },
          },
        });
        await prisma.user.update({
          where: {
            id: recieverId,
          },
          data: {
            friends: {
              connect: {
                id: senderId,
              },
            },
          },
        });
      }
      res.send(`request has been ${status + "ed"}`);
    });
  }
};
export default handler;
