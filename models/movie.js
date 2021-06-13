const mongoose = require("mongoose");
const Joi = require("joi");

const Movie = mongoose.model(
  "Movie",
  new mongoose.schema({
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    numberInStock: Number,
    dailyRentalRate: Number,
    genre: {
      ref: "Genres",
      type: mongoose.Schema.Types.ObjectId,
    },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
