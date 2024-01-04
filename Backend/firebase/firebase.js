require("dotenv").config();
const admin = require("firebase-admin");

const cred = JSON.parse(process.env.FIREBASE_KEY);

const app = admin.initializeApp({
  credential: admin.credential.cert(cred),
});

module.exports = admin;
