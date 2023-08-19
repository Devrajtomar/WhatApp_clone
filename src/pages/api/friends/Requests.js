import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const Id = req.body.Id;
      console.log(Id);
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
      console.log(requests);
      res.send(requests);
    });
  }
};

export default handler;
