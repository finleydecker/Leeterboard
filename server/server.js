const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes');

const app = express();

// handle parsing request body
app.use(express.json());

const username = 'finleydecker';
const password = 'avermentvaliancewhoseverpositionlit';
const cluster = 'cluster0.uzowd';
const dbname = 'leeterboardUsers';

mongoose.connect(`mongodb+srv://${username}:${[password]}@${cluster}.mongodb.net/${dbname}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});