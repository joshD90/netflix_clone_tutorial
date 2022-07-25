require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register User
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: crypto.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_KEY
      ).toString(),
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user, "found user");
    if (!user) return res.status(404).json("Wrong Username");
    const originalPassword = await crypto.AES.decrypt(
      user.password,
      process.env.CRYPTO_KEY
    );
    if (req.body.password !== originalPassword.toString(crypto.enc.Utf8))
      return res.status(401).send("Wrong Password");
    //execute this code below if all goes well
    //create a json web token by using .sign.  This lays out the information we
    //want to store, our secret signing key as well as how long it should last for
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
