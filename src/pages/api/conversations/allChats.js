import prisma from "../../../lib/prismaDB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const id = req.body.id;
      const response = await prisma.conversation.findMany({
        where: {
          id: id,
        },
        include: {
          users: true,
          messages: true,
        },
      });
      if (response.length !== 0) {
        res.send({ conversation: response[0] });
      } else {
        res.status(201).send("Not A Conversation");
      }
    } catch (err) {
      res.status(305).send({ err: err });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
export default handler;
