import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { Server } from "socket.io";
import { Request, Response } from "express";
import cors from "cors";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "./interfaces";

let managerID: string;

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

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("socket.id === ", socket.id);

  socket.on("initUser", (name) => {
    if (managerID) {
      console.log(`${name} was assigned as a regular user!`);
    } else {
      // Назначение единственного менеджера, который сможет переписываться со всеми остальными пользователями
      managerID = socket.id;
      console.log(`${name} was assigned as a manager!`);
    }

    io.to(socket.id).emit("assignManager", managerID);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
