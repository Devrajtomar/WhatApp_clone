import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prismaDB";
import jwt from "jsonwebtoken";
const jsonParser = bodyParser.json();

export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in bodyParser
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    // const { DataUrl } = req.body;
    // console.log(DataUrl);
    console.log("Request has made");
    console.log(req.body);
    res.send(req.body);

    try {
      const story = await prisma.story.create({
        data: {
          StoriesId: "456",
          type: "",
          DataUrl: "",
        },
      });
      console.log(story);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(405);
  }
};

export default handler;
