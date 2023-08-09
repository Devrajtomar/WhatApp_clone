// pages/api/register.js
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import prisma from "../../lib/prismaDB";
import jwt from "jsonwebtoken";
// Create middleware instance
const jsonParser = bodyParser.json();

const login = (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const { Email, Password } = req.body;
      try {
        const User = await prisma.user.findUnique({
          where: {
            email: String(Email),
          },
        });
        if (User) {
          const compare = await bcrypt.compare(Password, User.hashedPassword);
          if (compare) {
            const token = jwt.sign({ Email, Password }, Password, {
              expiresIn: "24h",
            });
            res.send({
              Found: true,
              message: `WELCOME BACK ${User.name.toUpperCase()}!`,
              token: token,
            });
          } else {
            res.send({ Found: false, message: "Invalid Password" });
          }
        } else {
          res.send({ Found: false, message: "Invalid E-mail" });
        }
      } catch (err) {
        res.status(404).json({
          Found: false,
          err: err,
          message: "user not found",
        });
      }
    });
  } else {
    res.status(405).json({ Found: false, message: "Method not allowed" });
  }
};

export default login;
