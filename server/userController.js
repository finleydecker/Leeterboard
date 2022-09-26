const User = require('./userModel');

const UserController = {

  getAllUsers(req, res, next) {
    const allUsers = User.find({}, (err, users) => {
      res.send(users);
    });
  },

  createUser(req, res, next) {
    const info = req.body;
    const newUser = new User({
      username: info.username,
      easySolved: info.easySolved,
      mediumSolved: info.mediumSolved,
      hardSolved: info.hardSolved,
      totalSolved: info.totalSolved
    });
    newUser.save((err, user) => {
      if (err) {
        return next(err);
      } else {
        return next();
      }
    });
  },

  updateUsers(req, res, next) {
    // receive each users stats
    // find and update each user by matching usernames
    User.findOneAndUpdate({ username: req.body.username }, (err, user) => {
      if (err) {
        return next(err);
      } else {
        return next();
      }
    })
  },

  deleteUser(req, res, next) {
    const nameToDelete = req.body.username;
    User.findOneAndDelete({ username: nameToDelete }, (err, user) => {
      // error handling
      if (nameToDelete === null) {
        return next({ err });
      }
      return next();
    });
  }
};

module.exports = UserController;