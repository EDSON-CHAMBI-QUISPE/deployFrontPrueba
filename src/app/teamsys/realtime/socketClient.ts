// src/app/teamsys/realtime/socketClient.ts
"use client";

import io from "socket.io-client";

type Socket = ReturnType<typeof io>;

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";
    socket = io(url, {
      autoConnect: true,
      // withCredentials: true,  // QUITADO, da error de tipos
      // opcional: forzar solo websocket:
      // transports: ["websocket"],
    });
  }
  return socket;
}
