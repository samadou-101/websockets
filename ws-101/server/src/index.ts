import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { createWebSocketServer } from "./webscokets";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
createWebSocketServer(server);

app.get("/", (req, res) => {
  res.send("WebSocket Chat Server is running");
});

server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
