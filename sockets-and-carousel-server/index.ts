import express from "express";
import { createServer } from "node:http";
// import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { Server } from "socket.io";
import { Request, Response } from "express";
import cors from "cors";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

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

// console.log("__dirname", __dirname);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("socket.id === ", socket.id);
  // socket.on("chat message", (msg) => {
  //   io.emit("chat message", msg);
  // });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
