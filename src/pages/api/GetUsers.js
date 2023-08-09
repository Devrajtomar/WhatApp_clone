import prisma from "../../lib/prismaDB";

const handler = async (req, res) => {
  const { email } = req.body;
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: email,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        updatedAt: true,
      },
    });
    res.send(users);
  } catch (err) {
    res.send([]);
  }
};
export default handler;
