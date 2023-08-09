// app.js (or any other file where you create and send data)

import bcrypt from "bcrypt";
import prisma from "../../../lib/prismaDB";
import jwt from "jsonwebtoken";
const createNewuser = async (name, email, password) => {
  let res = { name, email, password };
  try {
    const isUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (isUser) {
      return (res = { user: true });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name: String(name),
          email: String(email),
          hashedPassword: String(hashedPassword), // Store the hashed password in the database
        },
      });
      if (newUser) {
        const token = jwt.sign({ email, password }, password, {
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
  } catch (error) {
    res = { error };
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
  return res;
};

export default createNewuser;
