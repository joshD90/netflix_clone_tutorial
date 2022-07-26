require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const listRouter = require("./routes/lists");

mongoose.connect(process.env.DATABASE_URL, (err) => {
  if (err) return console.log(error.message);
  console.log("Mongodb Atlas Server has been connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/list", listRouter);

app.listen(8800, () => {
  console.log("Backend Server is connected on 8800");
});
