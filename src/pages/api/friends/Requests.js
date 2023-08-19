import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const Id = req.body.Id;
      const requests = await prisma.request.findMany({
        where: {
          AND: {
            recieverId: Id,
            IsAccepted: false,
            IsBlocked: false,
          },
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
      res.send(requests);
    });
  }
};

export default handler;
