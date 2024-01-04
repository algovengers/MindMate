const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
  keywords: [
    {
      type: String,
    },
  ],
  analysis: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Report", reportSchema);
