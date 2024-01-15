const dotenv = require("dotenv");
dotenv.config();
const { startGeminiChat } = require("../gemini/chat.js");
const chatHistModel = require("../models/ChatHist.js");
const {
  analysisReportPrompt,
  analysisScorePrompt,
  analysisKeywordsPrompt,
} = require("../gemini/analysisPrompts.js");

const Report = require("../models/Report.js");
const User = require("../models/User.js");

const doAnalysis = async (req, res) => {
  try {
    if (!req.userId) {
      res.status(401).json({ Error: "UserId not found" });
      return;
    }
    const userId = req.userId;
    const analysis = await genAnalysis(userId);

    if (analysis?.info === "nodata") {
      res.status(200).json({ msg: "nochatdata" });
      return;
    }

    const reportDatas = await Report.create({
      userId: userId,
      keywords: analysis.keywords,
      analysis: analysis.report,
      score: analysis.score,
    });
    try {
      const user = await User.findOne({id : userId})
      axios.post('https://mindmate-email-api.onrender.com/welcomeEmail',{
      "emailId" : user.email,
      "score" : analysis.score,
      "analysis"  : analysis.report,
      "keywords" : analysis.keywords
  })
    } catch (error) {
      console.log("error sending the message");
    }
    res.status(200).json({ data: reportDatas });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const genAnalysis = async (userId) => {
  try {
    if (userId === undefined) {
      // through err
      return;
    }
    const foundHist = await chatHistModel
      .find({ userId: userId })
      .sort({ timestamp: 1 });

    if (foundHist.length === 0) {
      return { info: "nodata" };
    }

    let foundHistForGemini = [];
    for (let conv of foundHist) {
      foundHistForGemini.push({
        role: "user",
        parts: [
          {
            text: conv.prompt,
          },
        ],
      });
      foundHistForGemini.push({
        role: "model",
        parts: [
          {
            text: conv.response,
          },
        ],
      });
    }

    // generate report
    let chat = startGeminiChat(foundHistForGemini);
    let result = await chat.sendMessage(analysisReportPrompt);
    let response = await result.response;
    let report = response.text();

    // generate score
    chat = startGeminiChat(foundHistForGemini);
    result = await chat.sendMessage(analysisScorePrompt);
    response = await result.response;
    const score = response.text();

    // generate keywords
    chat = startGeminiChat(foundHistForGemini);
    result = await chat.sendMessage(analysisKeywordsPrompt);
    response = await result.response;
    const keywordsResp = response.text();
    const keywords = keywordsResp
      .replace(/[^a-zA-Z0-9 \n]/g, "")
      .trim()
      .split("\n")
      .map((kw) => kw.trim())
      .filter(
        (kw) =>
          kw.length !== 0 &&
          kw.toLowerCase() !== "keyword" &&
          kw.toLowerCase() !== "keywords"
      );
    // console.log(keywords);

    return { report, score, keywords };
  } catch (error) {
    console.error(error);
  }
};

const getAnalysis = async (req, res) => {
  // console.log(req.cookies);
  try {
    if (!req.userId) {
      res.status(401).json({ msg: "UserId not found" });
      return;
    }
    const userId = req.userId;

    const reports = await Report.find({
      userId: userId,
    }).sort({ timestamp: -1 });

    res.status(200).json({ data: reports });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { genAnalysis, doAnalysis, getAnalysis };
