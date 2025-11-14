// src/app/teamsys/hooks/useForceLogout.tsx
"use client";

import { useEffect } from "react";
import { getSocket } from "../realtime/socketClient";

export function useForceLogout(userId: string | null) {
  useEffect(() => {
    if (!userId) return;

    const socket = getSocket();

    const onConnect = () => {
      // Avisamos al backend qué usuario es este socket
      socket.emit("auth", userId);
    };

    const onForceLogout = () => {
      // Limpia tokens y manda a login
      sessionStorage.clear();
      localStorage.clear();

      alert(
        "Tu sesión fue cerrada porque se cerraron las sesiones en otros dispositivos."
      );
      window.location.href = "/login";
    };

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("force-logout", onForceLogout);

    return () => {
      socket.off("connect", onConnect);
      socket.off("force-logout", onForceLogout);
    };
  }, [userId]);
}
