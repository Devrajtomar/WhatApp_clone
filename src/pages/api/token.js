// pages/api/register.js
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

// Create middleware instance
const jsonParser = bodyParser.json();

const handler = (req, res) => {
  if (req.method === "POST") {
    jsonParser(req, res, async () => {
      const { token } = req.body;

      const response = await jwt.decode(token);
      if (response.Email) {
        res.send(response.Email);
      }
      if (response.email) {
        res.send(response.email);
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
