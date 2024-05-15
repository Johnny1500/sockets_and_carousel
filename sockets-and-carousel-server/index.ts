import express from "express";
import { createServer } from "node:http";
// import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { Server } from "socket.io";
import { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.static("assets"));

const server = createServer(app);
const io = new Server(server);

// console.log("__dirname", __dirname);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
