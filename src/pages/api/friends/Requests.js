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
            RecieverId: Id,
            IsAccepted: false,
            IsBlocked: false,
          },
        },
        include: {
          Sender: true,
        },
      });
      res.send(requests);
    });
  }
};

export default handler;
