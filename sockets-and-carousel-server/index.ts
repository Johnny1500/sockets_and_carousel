import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { Server } from "socket.io";
import cors from "cors";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  PartialUser,
  User,
} from "../interfaces";

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
}

let manager: User | null = null;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static("assets"));

const server = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket.id === ", socket.id);

  socket.on("initUser", (partialUser: PartialUser) => {
    const user: User = { ...partialUser, id: socket.id, status: "user" };

    if (manager) {
      console.log(`${user.name} was assigned as a regular user!`);
      io.to(manager.id).emit("setNewUser", user);
      io.to(user.id).emit("setNewUser", manager);
    } else {
      // Назначение единственного менеджера, который сможет переписываться со всеми остальными пользователями
      manager = user;
      user.status = "manager";
      console.log(`${user.name} was assigned as a manager!`);
    }

    io.to(user.id).emit("assignManager", manager.id, user.id, user);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
