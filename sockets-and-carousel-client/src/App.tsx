import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function App(): JSX.Element {
  // Отключение двойного моунтинга в дев режиме
  const ignoreRef = useRef<boolean>(false);

  // let ignore = false;

  // Создание мокового пользователя и установка соединения с сервером
  useEffect(() => {
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
        const socket = io("ws://localhost:3000");

        socket.on("connect", () => {
          console.log(socket.id);
        });
      }

      console.log("useEffect user", user);
    }

    if (!ignoreRef.current) {
      console.log("test useEffect");
      initialFetchUser();
    }

    return () => {
      ignoreRef.current = true;
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
