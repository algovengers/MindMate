const user = require("../models/User");
const { genAnalysis } = require("./analysis");
const report = require("../models/Report");
const { v4: uuid } = require("uuid");
const User = require("../models/User");
const { decodeAuthToken } = require("../firebase/auth");

async function signinwithGoogle(req,res){
  try {
    const token = req.headers.token
    const email = await decodeAuthToken(token)
    console.log(email);
    if (!email) {
      res.status(401).json({ message: "Invalid Access Token" });
      return;
    }
    const data = await user.findOne({ email: email });
    if(req.cookies?.userid){
      //chat already done
      if(!data){
        //user not created yet
      const uuid = req.cookies.userid;

      //create user account
      const user = await User.create({
        id: uuid,
        email: email,
      });

      res.status(200).json({ data: user });
      }
      else{
        //user already created
        const data = await user.findOne({ email: email });

    if (data?.id) {
      res.cookie("userid", data.id, {
        maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    res.status(200).json({ data: data });
      }
    }
    else{
      if(!data){
        //user not created yet
        const userId = uuid();

        //check this if cookie is being set or not
  
        res.cookie("userid", userId, {
          maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
  
        const user = await User.create({
          id: userId,
          email: email,
        });
        res.status(200).json({ data: user });
      }
      else{
        //user already created
        const user = await User.findOne({ email: email });

        if (user?.id) {
          res.cookie("userid", user.id, {
            maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
        }
    
        res.status(200).json({ data: user });
      }
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid Access Token" });
  }
}
async function signup(req, res) {
  try {
    const token = req.headers.token;
    // console.log(req.headers.token+ "here");
    const email = await decodeAuthToken(token);
    console.log(email);
    if (!email) {
      res.status(401).json({ message: "Invalid Access Token" });
      return;
    }
    if (req.cookies?.userid) {
      // console.log(req.cookies.userid);
      //chat already done
      const uuid = req.cookies.userid;

      //create user account
      const user = await User.create({
        id: uuid,
        email: email,
      });

      res.status(200).json("Account Created");
    } else {
      //chat not done yet
      //genereate the uuid and return a cookie

      const userId = uuid();

      //check this if cookie is being set or not

      res.cookie("userid", userId, {
        maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      const user = await User.create({
        id: userId,
        email: email,
      });

      //we are not creating a report here since there is not analysis till now
      //when the chat is done user will again hit the analysis route
      // we will create report then and store it in the user document

      res.status(200).json("Account Created");
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Invalid Access Token" });
  }
}

async function login(req, res) {
  try {
    // const auth = new FirebaseAuth();
    const email = await decodeAuthToken(req.headers.token);
    if (!email) {
      res.status(401).json({ message: "Invalid Access Token" });
      return;
    }
    //get Data from email from database
    const data = await user.findOne({ email: email });

    if (data?.id) {
      res.cookie("userid", data.id, {
        maxAge: 1209600000, //14 * 24 * 60 * 60 * 1000 -> 14days
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(401).json({ message: "Invalid Access Token" });
  }
}

async function isUser(req, res) {
  try {
    // console.log(req.cookies);
    if (req.cookies?.userid) {
      const userid = req.cookies?.userid;
      // console.log(userid);
      const user = await User.find({ id: userid });
      // console.log(user, "Here");
      if (user?.length != 0) {
        res.status(200).json({ message: "User validated" });
      } else {
        res.status(401).json({ error: "Logged Out" });
      }
    } else {
      res.status(401).json({ error: "Logged Out" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "Logged Out" });
  }
}

async function logout(req, res) {
  if (!req.cookies?.userid) {
    res.status(401).json({ Error: "UserId not found" });
    return;
  }
  res.cookie("userid", null, {
    maxAge: 0,
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({ msg: "loggedout" });
}

module.exports = { signup, login, isUser, logout,signinwithGoogle };
