import prisma from "../../../lib/prismaDB";

export default async ({ message, id, senderId }) => {
  const newMessage = await prisma.message.create({
    data: {
      body: message,
      conversation: {
        connect: {
          id,
        },
      },
      sender: {
        connect: {
          id: senderId,
        },
      },
      seen: {
        connect: {
          id: senderId,
        },
      },
    },
    include: {
      seen: true,
      sender: true,
    },
  });
  return newMessage;
};
