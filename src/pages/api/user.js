// pages/api/register.js
import bodyParser from "body-parser";
import prisma from "../../lib/prismaDB";
// Create middleware instance
const jsonParser = bodyParser.json();

const handler = (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const { data_ } = req.body;
      const response = await prisma.user.findUnique({
        where: {
          email: String(data_),
        },
      });
      res.send(response);
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
