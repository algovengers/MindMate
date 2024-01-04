const { Router } = require("express");
const { connectWithChatBot } = require("../controllers/chat.js");
const { doAnalysis } = require("../controllers/analysis.js");
const { userMiddleware } = require("../middlewares/genUserId.js");
const { signup, login } = require("../controllers/user.js");

const router = Router();

router.route("/chat").get(userMiddleware, connectWithChatBot);
router.route("/analysis").get(userMiddleware, doAnalysis);
router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
