require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const Crypto = require("crypto-js");
const verify = require("../veryifyToken");

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = crypto.getRandomValues
        .encrypt(req.body.password, process.env.CRYPTO_KEY)
        .toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...restOfUser } = updatedUser._doc;
      res.status(200).json(restOfUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can only update your account");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("You have Successfully Deleted This User");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can only delete your account");
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...restOfInfo } = user._doc;
    res.status(200).json(restOfInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find({}).sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed to view all users");
  }
});

//GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const data = await User.aggregate([
      {
        $project: { month: { $month: "$createdAt" } },
      },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
