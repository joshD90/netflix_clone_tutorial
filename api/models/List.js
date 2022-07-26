const mongoose = require("mongoose");
const Movie = require("../models/Movie");

const ListSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
