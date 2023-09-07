import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const Id = req.body.user.id;

      const Stories = await prisma.user.findUnique({
        where: {
          id: Id,
        },
        select: {
          friends: {
            select: {
              id: true,
              Name: true,
              image: true,
              Stories: true,
            },
          },
        },
      });
      res.send(Stories.friends);
    });
  }
};
export default handler;
