const router = require("express").Router();
const List = require("../models/List");
const verify = require("../veryifyToken");
const Movie = require("../models/Movie");

//manually create a new list
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You do not have administrative Priviliges");
  }
});

//randomly create a new list based on genre
router.post("/random", verify, async (req, res) => {
  try {
    const newList = new List(req.body);

    const aggregateList = await aggregateGenre(req.body.genre, req.body.type);
    newList.content = aggregateList[0].array;

    const savedList = await newList.save();

    res.status(201).json(savedList);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//delete a list
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("You have successfully deleted this List");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You must be administrator to delete a list");
  }
});

//GET A LIST
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let typeAdjusted;
  typeQuery === "series" ? (typeAdjusted = "isSeries") : "";
  console.log("typeadjusted", typeAdjusted);

  console.log(typeQuery, "Type Query", genreQuery, "genreQuery");
  let list = [];
  try {
    if (typeQuery) {
      console.log("there has been a type selected");
      if (genreQuery) {
        list = await List.aggregate([
          { $match: { type: typeAdjusted, genre: genreQuery } },
          { $sample: { size: 10 } },
        ]);
      } else {
        list = await List.aggregate([
          { $match: { type: typeAdjusted } },
          { $sample: { size: 10 } },
        ]);
      }
    } else if (genreQuery) {
      list = await List.aggregate([
        { $match: { genre: genreQuery } },
        { $sample: { size: 10 } },
      ]);
    } else list = await List.aggregate([{ $sample: { size: 10 } }]);
  } catch (error) {
    return res.status(500).json(error);
  }
  console.log(list);
  res.status(200).json(list);
});

//this function must return a promise so that it can be called asyncrounously
async function aggregateGenre(listGenre, type) {
  let list;
  try {
    if (type) {
      console.log("isType = true");
      list = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $match: { genre: listGenre } },
        { $sample: { size: 5 } },
        { $group: { _id: null, array: { $push: "$_id" } } },
      ]);
    } else {
      console.log("no type");
      list = await Movie.aggregate([
        { $match: { genre: listGenre } },
        { $sample: { size: 5 } },
        { $group: { _id: null, array: { $push: "$_id" } } },
      ]);
    }
    return new Promise((resolve, reject) => {
      if (list) resolve(list);
      if (!list) reject("Something didn't aggregate properly");
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
