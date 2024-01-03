const { v4: uuid } = require("uuid");

async function userMiddleware(req, res, next) {
  const userId = req.cookies?.userid;
  // console.log(userId);
  if (userId && userId.trim() !== "") {
    req.userId = userId;
  } else {
    const userId = uuid();
    req.userId = userId;
    // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.cookie("userid", userId, {
      maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  }

  next();
}

module.exports = { userMiddleware };
