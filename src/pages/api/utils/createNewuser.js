// app.js (or any other file where you create and send data)

import bcrypt from "bcrypt";
import prisma from "../../../lib/prismaDB";
import jwt from "jsonwebtoken";
const createNewuser = async (Name, Email, Password) => {
  let res = { Name, Email, Password };
  try {
    const isUser = await prisma.user.findUnique({
      where: {
        Email: Email,
      },
    });
    if (isUser) {
      return (res = { user: true });
    } else {
      const hashedPassword = await bcrypt.hash(Password, 10);

      const newUser = await prisma.user.create({
        data: {
          Name: String(Name),
          Email: String(Email),
          hashedPassword: String(hashedPassword), // Store the hashed Password in the database
        },
      });
      if (newUser) {
        const KEY = process.env.SECRET_KEY;
        const token = jwt.sign({ Email, KEY }, KEY, {
          expiresIn: "24h",
        });
        return (res = { success: true, token: token });
      }
    }

    // Create a message
    const newMessage = await prisma.message.create({
      data: {
        content: "Hello there!",
        sender: {
          connect: { id: newUser.id }, // Connect the message to the newly created user
        },
        receiver: {
          connect: { id: newUser.id }, // Connect the message to the same user as the receiver
        },
      },
    });
    console.log("Created message:", newMessage);
  } catch (error) {
    res = { error: error };
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
  return res;
};

export default createNewuser;
