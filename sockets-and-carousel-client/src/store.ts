/* eslint-disable @typescript-eslint/no-unused-vars */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Message = {
  id: string;
  userId: string;
  timestamp: number;
  content: string;
  own: boolean;
  fromManagerToHimSelf?: boolean;
};

type User = {
  id: string;
  avatarURL: string;
  status: "manager" | "user";
  name: "string";
};

type State = {
  messages: Message[];
  users: User[];
};

type Actions = {
  updateUsers: (user: User) => void;
  updateMessages: (message: Message) => void;
};

const useStore = create<State & Actions>()(
  immer(
    devtools((set) => ({
      users: [],
      messages: [],
      updateUsers: (user) =>
        set((state) => state.users.push(user), false, "updateUsers"),
      updateMessages: (message) =>
        set((state) => state.messages.push(message), false, "updateMessages"),
    }))
  )
);

export default useStore;