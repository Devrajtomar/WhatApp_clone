import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const recieverId = req.body.recieverId;
      const senderId = req.body.senderId;
      const requests = await prisma.request.findMany({
        where: {
          AND: {
            SenderId: senderId,
            RecieverId: recieverId,
          },
        },
      });
      if (requests.length === 0) {
        try {
          const newRequest = await prisma.request.create({
            data: {
              Sender: {
                connect: {
                  id: senderId,
                },
              },
              Reciever: {
                connect: {
                  id: recieverId,
                },
              },
            },
          });
          res.send(newRequest);
        } catch (err) {
          res.send(err);
          console.log(err);
        }
      } else {
        res.send("Request already exist");
      }
    });
  }
};

export default handler;
