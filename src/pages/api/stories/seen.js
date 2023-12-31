import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prismaDB";
import jwt from "jsonwebtoken";
const jsonParser = bodyParser.json();

const seen = (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const { userId, StoryId } = req.body;
      try {
        const seenStory = await prisma.story.update({
          where: {
            id: StoryId,
          },
          data: {
            SeenUsers: {
              connect: {
                id: userId,
              },
            },
          },
          include: {
            SeenUsers: {
              select: {
                id: true,
                Name: true,
                image: true,
                about: true,
              },
            },
          },
        });
        res.send(seenStory);
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.status(406);
  }
};
export default seen;
