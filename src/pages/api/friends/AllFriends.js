import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const Id = req.body.recieverId;
      const friends = await prisma.request.findMany({
        where: {
          AND: {
            recieverId: Id,
            IsAccepted: true,
          },
        },
        include: {
          sender: true,
        },
      });
      res.send(friends);
    });
  }
};

export default handler;
