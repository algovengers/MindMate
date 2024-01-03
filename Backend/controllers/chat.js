const dotenv = require("dotenv");
const { v4: uuid } = require("uuid");
const WebSocket = require("ws");
const querystring = require("querystring");
dotenv.config();
const { startGeminiChat } = require("../gemini/chat.js");
const chatHistModel = require("../models/ChatHist.js");

const connectWithChatBot = async (req, res) => {
  try {
    if (req.userId === undefined) {
      // through err
      return;
    }

    // console.log(foundHistForGemini[0]);

    const roomId = uuid();
    const websocketserverLink = `${String(
      process.env.WEBSOCKET_SERVER
    )}?${querystring.stringify({
      id: roomId,
      // serverkey: process.env.WEBSOCKET_SERVER_KEY,
      isServer: true,
    })}`;

    const wss = new WebSocket(websocketserverLink);
    wss.on("open", () => {
      // console.log("opn");
      res.status(200).json({ chatId: roomId });
      wss.send(JSON.stringify({ type: "server:connected" }));
    });

    // Get history from mongo
    const chat = startGeminiChat();

    wss.on("message", async (data) => {
      try {
        data = JSON.parse(data.toString());

        if (data?.type === "client:chathist") {
          //send chat hist
        } else if (data?.type === "client:prompt") {
          if (data.prompt === undefined) {
            // throw err
            return;
          }

          // Prompt by the user sent to gemini

          // should be stored in the db
        }
      } catch (error) {
        console.log(error);
      }
    });
    wss.on("close", () => {
      // console.log("cls");
    });
    wss.on("error", (error) => {
      console.error("WebSocket Error:", error.message);
      res.sendStatus(404);
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
module.exports = { connectWithChatBot };
