import { WebSocketServer } from "ws";

export function createWebSocketServer(server: any) {
  const wsServer = new WebSocketServer({ noServer: true });

  const clients: any[] = [];

  // Handle new WebSocket connections
  wsServer.on("connection", (ws) => {
    console.log("New client connected");
    clients.push(ws);
    // Handle messages from clients
    ws.on("message", (message) => {
      // Broadcast message to all connected clients
      clients.forEach((client) => {
        if (client !== ws && client.readyState === client.OPEN) {
          client.send(message.toString());
        }
      });
      console.log("Received message:", message.toString());
    });

    // Handle client disconnections
    ws.on("close", () => {
      const index = clients.indexOf(ws);
      if (index > -1) {
        clients.splice(index, 1); // Remove client from the list
      }
      console.log("Client disconnected");
    });
  });

  // Upgrade HTTP server to WebSocket server
  server.on("upgrade", (request: any, socket: any, head: any) => {
    wsServer.handleUpgrade(request, socket, head, (ws: any) => {
      wsServer.emit("connection", ws, request);
    });
  });

  return wsServer;
}
