const mongoose = require('mongoose');
const express = require('express');
const app = express();

const userController = require('./userController');

const cors = require('cors');
const UserController = require('./userController');

app.use(cors());

const PORT = 3000;

mongoose.connect('mongodb+srv://leetadmin:breakcanonizeapproveprobityheadrest@cluster0.uyslkc5.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = express.Router();
app.use('/', userRouter);

// Get all users in the database
userRouter.get('/', UserController.getAllUsers, (req, res, next) => {
  res.sendStatus(200);
});

// Create a user in the database
userRouter.post('/', userController.createUser, (req, res, next) => {
  res.sendStatus(200);
});

// Update all users in the database
userRouter.patch('/', userController.updateUsers, (req, res, next) => {
  res.sendStatus(200);
});

// Delete a user in the database
userRouter.delete('/', userController.deleteUser, (req, res, next) => {
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
  console.log('Server is running at port 3000');
});