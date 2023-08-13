import prisma from "../../lib/prismaDB";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  jsonParser(req, res, async () => {
    const { email } = req.headers;
    try {
      const users = await prisma.user.findMany({
        where: {
          NOT: {
            Email: email,
          },
        },
        select: {
          id: true,
          Name: true,
          image: true,
          updatedAt: true,
        },
      });
      res.send(users);
    } catch (err) {
      res.send([]);
    }
  });
};
export default handler;
