const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");

const url = '' // mongodb url to vidly db

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo db connected...."))
  .catch((err) => console.log("Couldn't connect to DB... "));

app.use(express.json());
app.use("/api/genres/", genres);
app.use("/api/customers/", customers);
app.use("/api/movies/", movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}...`));
