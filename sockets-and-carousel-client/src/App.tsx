import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import useStore from "./store";

interface ClientToServerEvents {
  initUser: (name: string) => void;
}

interface ServerToClientEvents {
  assignManager: (id: string) => void;
}

function App(): JSX.Element {
  // Отключение двойного моунтинга в дев режиме
  const ignoreRef = useRef<boolean>(false);

  const [setAssignedManagerID, setSocket] = useStore((state) => [
    state.setAssignedManagerID,
    state.setSocket,
  ]);

  // Создание мокового пользователя и установка соединения с сервером
  useEffect(() => {
    let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

    async function fetchPartialRandomUser() {
      try {
        const response = await fetch(
          "https://random-data-api.com/api/users/random_user"
        );

        if (response.ok) {
          const json = await response.json();
          console.log("json", json);

          return {
            avatarURL: json.avatar,
            name: json.first_name + " " + json.last_name,
          };
        } else {
          console.error("HTTP Error: " + response.status);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log("Network error === ", error.message);
        }
      }
    }

    async function initialFetchUser() {
      const user = await fetchPartialRandomUser();

      if (user) {
        socket = io("ws://localhost:3000");

        socket.on("connect", () => {
          socket.emit("initUser", user.name);
        });

        socket.on("assignManager", (id) => {
          console.log(`User was assigned to a manager with id ${id}`);
          setAssignedManagerID(id);
          setSocket(socket);
        });
      }

      console.log("useEffect user", user);
    }

    if (!ignoreRef.current) {
      initialFetchUser();
    }

    return () => {
      ignoreRef.current = true;
      if (socket) socket.disconnect();
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
