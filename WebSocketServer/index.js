const WebSocket = require("ws");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.SOCKET_PORT || 8802;
const wss = new WebSocket.Server({ port: port });

const map = new Map();
/* 
    This is an inmemory storage for all the rooms
    Map will store the room id of the current users and their connection
    map type = {
        uuid : Connection[]
    }
    connection type = {
        connectId : number,
        ws : WebSocket Connection
    }
*/

let counter = 0;
// wss.broadcast = (id, data) => {
//   console.log("bcas");
//   wss.clients.forEach((client) => {
//     if (client.readyState == WebSocket.OPEN && data != undefined) {
//       if (client.id === id) {
//         client.send(data);
//       }
//     }
//   });
// };
wss.on("connection", async (ws, req) => {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const id = params?.get("id");
  if (!id) {
    // console.log("Invalid! no id");
    ws.terminate();
    return;
  }
  const isServer = params?.get("isServer") == "true";

  if (!isServer && (!map.has(id) || map.get(id).server === undefined)) {
    // console.log("Invalid! no server wrt id");
    ws.terminate();
    return;
  }

  if (!map.has(id)) {
    map.set(id, {});
  }

  if (isServer) {
    map.get(id).server = ws;
  } else {
    map.get(id).client = ws;
  }

  const connectId = counter++;

  // ws["id"] = id;

  ws.on("message", (data, isBinary) => {
    const arr = map.get(id);

    if (isServer) {
      map.get(id)?.client?.send(data, { binary: isBinary });
    } else {
      map.get(id)?.server?.send(data, { binary: isBinary });
    }
  });
  ws.on("close", () => {
    if (isServer) {
      map.get(id)?.client?.terminate();
    } else {
      map.get(id)?.server?.terminate();
    }
    map.delete(id);
  });
});