// pages/api/register.js
import bodyParser from "body-parser";
import prisma from "../../lib/prismaDB";
import jwt from "jsonwebtoken";
// Create middleware instance
const jsonParser = bodyParser.json();

const handler = (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const { token } = req.body;

      const response = await jwt.decode(token);

      if (response) {
        if (response.KEY === process.env.SECRET_KEY) {
          const data = await prisma.user.findUnique({
            where: {
              Email: String(response.Email),
            },
            select: {
              id: true,
              Email: true,
              Name: true,
              image: true,
              about: true,
              seenMessages: true,
              conversations: true,
              messages: true,
              updatedAt: true,
              createdAt: true,
              friends: true,
              seenStories: true,
              Stories: true,
              Calls: true,
            },
          });
          res.send(data);
        } else {
          res.status(405).json({ message: "Unathorized" });
        }
      }
    });
  } else {
    res.status(404).json({ message: "Path not Found" });
  }
};

export default handler;
