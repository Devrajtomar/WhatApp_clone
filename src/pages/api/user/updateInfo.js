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
  if (req.method === "PATCH") {
    const form = new IncomingForm();

    const jsonParser = bodyParser.json();
    jsonParser(req, res, () => {
      form.parse(req, async (error, fields, files) => {
        try {
          if (files.file) {
            const uplaoadImage = await cloudinary.v2.uploader.upload(
              files.file[0].filepath,
              {
                resource_type: "image",
              },
            );
            if (uplaoadImage.url) {
              await prisma.user.update({
                where: {
                  id: fields.id[0],
                },
                data: {
                  image: uplaoadImage.url,
                  Name: fields.name[0],
                  about: fields.about[0],
                },
              });
              res.status(200);
            }
          } else {
            await prisma.user.update({
              where: {
                id: fields.id[0],
              },
              data: {
                Name: fields.name[0],
                about: fields.about[0],
              },
            });
            return res.status(200);
          }
        } catch (err) {
          console.log(err);
        }
      });
    });
  }
};
export default handler;
