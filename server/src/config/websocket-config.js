// src/config/web-socket-config.js
import { WebSocketServer, WebSocket } from "ws";

let clients = new Set(); // Use a Set for efficient add/remove operations

export function web_socket_config(server) {
  const wss = new WebSocketServer({ 
    server,
    // Basic security: Only allow connections from allowed origins (customize as needed)
    verifyClient: (info) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000']; 
      return allowedOrigins.includes(info.origin);
    },
    // Limit message size to prevent abuse (e.g., 1MB)
    maxPayload: 1024 * 1024,
  });

  wss.on("connection", (ws, req) => {
    console.log(`Client connected from ${req.socket.remoteAddress}`);
    clients.add(ws);

    // Handle incoming messages
    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log("Received message:", message);
        
        if (message.type === "echo") {
          ws.send(JSON.stringify({ type: "echo", data: message.data }));
        } else if (message.type === "broadcast") {
          broadcast("user_broadcast", message.data, ws);
        } else {
          ws.send(JSON.stringify({ type: "error", data: "Unknown message type" }));
        }
      } catch (error) {
        console.error("Error parsing message:", error);
        ws.send(JSON.stringify({ type: "error", data: "Invalid JSON" }));
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log(`Client disconnected. Total clients: ${clients.size}`);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      clients.delete(ws);
    });

    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      } else {
        clearInterval(pingInterval);
      }
    }, 30000);

    ws.on("pong", () => {

    });
  });


  function broadcast(type, data, excludeWs = null) {
    const message = JSON.stringify({ type, data });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== excludeWs) {
        try {
          client.send(message);
        } catch (error) {
          console.error("Error broadcasting to client:", error);
        }
      }
    });
    console.log(`Broadcasted ${type} to ${wss.clients.size - (excludeWs ? 1 : 0)} clients`);
  }


  function getClientCount() {
    return clients.size;
  }

  return { wss, broadcast, getClientCount };
}