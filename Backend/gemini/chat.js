const dotenv = require("dotenv");
dotenv.config();
const { initHist } = require("./initHist.js");

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const API_KEY = String(process.env.GEMINI_KEY);

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

let geminiModel;

const setupGeminiChat = async () => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  geminiModel = genAI.getGenerativeModel({ model: MODEL_NAME });
};

const startGeminiChat = (history = []) =>
  geminiModel.startChat({
    generationConfig,
    safetySettings,
    history: [...initHist, ...history],
  });

module.exports = { setupGeminiChat, geminiModel, startGeminiChat };
