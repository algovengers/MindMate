const { Router } = require("express");
const { connectWithChatBot } = require("../controllers/chat.js");
const { userMiddleware } = require("../middlewares/genUserId.js");

const router = Router();

router.route("/chat").get(userMiddleware, connectWithChatBot);
module.exports = router;
