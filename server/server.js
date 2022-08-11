const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userController = require('./userController');
const User = require('./userModel');

const PORT = 3000;

mongoose.connect('mongodb+srv://leetadmin:breakcanonizeapproveprobityheadrest@cluster0.uyslkc5.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = express.Router();
app.use('/', userRouter);

// Create a student in the database
// http://localhost:3000/
userRouter.post('/', userController.createUser, (req, res, next) => {
  res.sendStatus(200);
});

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log("Server is running at port 3000");
});