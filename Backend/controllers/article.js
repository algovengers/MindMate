const dotenv = require("dotenv");
dotenv.config();
const { startGeminiChat } = require("../gemini/chat.js");

const fetchArticleFromKeywords = async (req, res) => {
  try {
    if (req.userId === undefined) {
      // through err
      return;
    }
  } catch (error) {}
};

module.exports = { fetchArticleFromKeywords };
