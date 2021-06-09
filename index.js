const mongoose = require('mongoose');
const express = require("express");
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');

const url = 'mongodb+srv://boss:Artur986@nodedb.48fns.mongodb.net/GenresTutorial?retryWrites=true&w=majority'

mongoose.connect(url,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
.then(() => console.log('Mongo db connected....'))
.catch((err) => console.log('Couldn\'t connect to DB... '));


app.use(express.json());
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}...`));