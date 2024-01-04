const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
  },
  lastmail: {
    type: Date,
    default: null,
  },
  totalmail: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
