const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../veryifyToken");

//CREATE NEW MOVIE
router.post("/", verify, async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(403).json("You do not have permissions to add a movie");
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//UPDATE MOVIE
router.put("/:id", verify, async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(403).json("You are not allowed to alter any movies");
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//DELETE Movie
router.delete("/:id", verify, async (req, res) => {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .json("You do not have permission to delete this movie");
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("Movie has been deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET RANDOM MOVIE
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else if (type === "movies") {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([{ $sample: { size: 1 } }]);
    }
    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET SINGLE MOVIE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET ALL MOVIES
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const allMovies = await Movie.find({});
      res.status(200).json(allMovies);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You do not have permission to do this");
  }
});

module.exports = router;
