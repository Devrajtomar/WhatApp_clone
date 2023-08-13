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
          hashedPassword: String(hashedPassword),
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
  } catch (error) {
    res = { error: error };
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
  return res;
};

export default createNewuser;
