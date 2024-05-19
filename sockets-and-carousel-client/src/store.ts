/* eslint-disable @typescript-eslint/no-unused-vars */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Socket } from "socket.io-client";
import { User } from "../../interfaces";

type Message = {
  id: string;
  userId: string;
  timestamp: number;
  content: string;
  own: boolean;
};

type State = {
  socket: Socket | null;
  assignedManagerID: string;
  currentUserID: string;
  messages: Message[];
  users: User[];
};

type Actions = {
  updateUsers: (user: User) => void;
  updateMessages: (message: Message) => void;
  setAssignedManagerID: (assignedManagerID: string) => void;
  setCurrentUserID: (currentUserID: string) => void;
  setSocket: (socket: Socket) => void;
};

const useStore = create<State & Actions>()(
  immer(
    devtools((set) => ({
      socket: null,
      assignedManagerID: "",
      currentUserID: "",
      users: [],
      messages: [],
      updateUsers: (user) =>
        set((state) => state.users.push(user), false, "updateUsers"),
      updateMessages: (message) =>
        set((state) => state.messages.push(message), false, "updateMessages"),
      setAssignedManagerID: (assignedManagerID) =>
        set(
          (state) => {
            return {
              ...state,
              assignedManagerID,
            };
          },
          false,
          "setAssignedManagerID"
        ),
      setCurrentUserID: (currentUserID) =>
        set(
          (state) => {
            return {
              ...state,
              currentUserID,
            };
          },
          false,
          "setCurrentUserID"
        ),
      setSocket: (socket) =>
        set(
          (state) => {
            return {
              ...state,
              socket,
            };
          },
          false,
          "setSocket"
        ),
    }))
  )
);

export default useStore;
