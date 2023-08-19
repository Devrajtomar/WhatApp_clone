import prisma from "../../../lib/prismaDB";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const handler = async (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const recieverId = req.body.recieverId;
      const senderId = req.body.senderId;
      const status = req.body.status;
      console.log([recieverId, senderId]);
      const requests = await prisma.request.findMany({
        where: {
          AND: {
            senderId,
            recieverId,
          },
        },
      });
      console.log(requests);
      const response = await prisma.request.update({
        where: {
          id: requests[0].id,
        },
        data: {
          IsAccepted: status === "accept" ? true : false,
          IsBlocked: status === "block" ? true : false,
        },
      });
      console.log(response);
      res.send(`request has been ${status + "ed"}`);
    });
  }
};
export default handler;
