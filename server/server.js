import http from "http";
import app from "./src/app.js"
import { web_socket_config } from "./src/config/websocket-config.js";
import { setSocketInstance } from "./src/config/socket-instance.js";
const server = http.createServer(app);

const socketObj = web_socket_config(server);
setSocketInstance(socketObj);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});