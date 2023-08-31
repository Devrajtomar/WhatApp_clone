import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prismaDB";
import jwt from "jsonwebtoken";
const jsonParser = bodyParser.json();

const stories = (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const { userId, FriendId } = req.body;
      try {
        const stories = await prisma.stories.findUnique({
          where: {
            userId,
          },
          include: {
            Stories: true,
          },
          select: {
            Stories: {
              include: {
                SeenUsers: true,
              },
              select: {
                type: true,
                data: true,
                description: true,
                createdAt: true,
                SeenUsers: {
                  select: {
                    Name: true,
                    Email: true,
                    about: true,
                    image: true,
                  },
                },
              },
            },
          },
        });
        res.send(stories);
        console.log(stories);
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.status(405);
  }
};
export default stories;
