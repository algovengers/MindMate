const WebSocket = require("ws");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.SOCKET_PORT || 8802;
const wss = new WebSocket.Server({ port: port });

wss.on("connection", async (ws, req) => {
  const params = new URLSearchParams(req.url.split("?")[1]);
});
