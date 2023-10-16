import { Socket, Server as NetServer } from "net";
import { NextApiResponse } from "next";
import { Server as ServerIo } from "socket.io";

export type NextApiServerResponseIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIo;
    };
  };
};
