const express = require("express");
const router = express.Router;

const { Movie, validateMovie } = require("../models/movie");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(404).send("Movie with this ID not found...");
  const movie = await Movie.findById(req.params.id);
});

router.post("/", async (req, res) => {});
