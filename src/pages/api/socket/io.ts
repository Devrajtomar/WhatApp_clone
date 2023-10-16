import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIo } from "socket.io";
import { NextApiServerResponseIo } from "../../../../types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiServerResponseIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIo(httpServer, {
      path: path,
      //@ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default handler;
