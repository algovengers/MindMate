const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routers/router.js");
const connectDB = require("./db/connect.js");
const { setupGeminiChat } = require("./gemini/chat.js");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://localhost:3000",
      "https://mind-mate-wellness.vercel.app/",
      "https://mind-mate-wellness.vercel.app",
      "http://mind-mate-wellness.vercel.app/",
      "http://mind-mate-wellness.vercel.app",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie", "token"],
  })
);
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
// parse cookie
app.use(cookieParser());

app.use(router);

const initServer = async () => {
  try {
    const port = String(process.env.SERVER_PORT) || 8000;
    await connectDB();
    console.log("DB Connected");
    // init gemini
    await setupGeminiChat();

    app.listen(port, () => {
      console.log(`Backend Server Started on ${port} ...`);
    });
  } catch (err) {
    console.log(err.message);
    console.log("Server not started!");
  }
};
initServer();
