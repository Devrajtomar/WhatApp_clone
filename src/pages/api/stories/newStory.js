import { IncomingForm } from "formidable";
import cloudinary from "cloudinary";
import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};
cloudinary.v2.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_KEY,
  api_secret: process.env.CLOUDNARY_SECRET,
});
const handler = async (req, res) => {
  if (req.method === "POST") {
    const form = new IncomingForm();

    const jsonParser = bodyParser.json();
    jsonParser(req, res, () => {
      form.parse(req, async (error, fields, files) => {
        try {
          const uplaodedFile = await cloudinary.v2.uploader.upload(
            files.file[0].filepath,
            {
              resource_type: "auto",
            },
          );

          if (uplaodedFile.url) {
            const Story = await prisma.story.create({
              data: {
                user: {
                  connect: {
                    id: fields.userId[0],
                  },
                },
                type: uplaodedFile.resource_type,
                DataUrl: uplaodedFile.url,
                SeenUsers: {
                  connect: {
                    id: fields.userId[0],
                  },
                },
              },
              include: {
                SeenUsers: {
                  select: {
                    id: true,
                    image: true,
                    Name: true,
                    about: true,
                  },
                },
              },
            });
            res.send(Story);
          } else {
            res.send({ fields, uplaodedFile });
          }
        } catch (err) {
          console.log(err);
          res.send(err);
        }
      });
    });
  } else {
    res.status(405);
  }
};

export default handler;
