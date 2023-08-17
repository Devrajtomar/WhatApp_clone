import jwt from "jsonwebtoken";
import uuid from "uuid-random";
const generate = (privateKey, { id, name, email, avatar, appId, kid }) => {
  const now = new Date();
  const jwt_ = jwt.sign(
    {
      aud: "jitsi",
      context: {
        user: {
          id,
          name,
          avatar,
          email: email,
          moderator: "true",
        },
        features: {
          livestreaming: "true",
          recording: "true",
          transcription: "true",
          "outbound-call": "true",
        },
      },
      iss: "chat",
      room: "*",
      sub: appId,
      exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
      nbf: Math.round(new Date().getTime() / 1000) - 10,
    },
    privateKey,
    { algorithm: "RS256", header: { kid } },
  );
  return jwt_;
};

/**
 * Generate a new JWT.
 */

const handler = (req, res) => {
  const token = generate("my private key", {
    id: uuid(),
    name: "my user name",
    email: "my user email",
    avatar: "my avatar url",
    appId: "my AppID", // Your AppID ( previously tenant )
    kid: "my api key",
  });
  res.send(token);
  //console.log(token);
};
export default handler;
