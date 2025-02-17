import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { createServer } from "http";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

// creating the websocket connection
const server = createServer(app);
const wsServer = new WebSocketServer({ noServer: true });

wsServer.on("connection", (ws) => {
  console.log("connected to the client");
  ws.on("message", (message) => {
    if (Buffer.isBuffer(message)) {
      console.log("Received message from the client: ", message.toString());
    }

    ws.send(`The server is talking `);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
server.on("upgrade", (req, socket, head) => {
  // Handle WebSocket connection upgrade
  wsServer.handleUpgrade(req, socket, head, (ws) => {
    wsServer.emit("connection", ws, req); // Emit the connection event
  });
});
server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
