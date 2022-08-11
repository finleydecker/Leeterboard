const User = require('./userModel');

const UserController = {
  createUser(req, res, next) {
    const info = req.body;
    // console.log('req body is: ', info);
    const newUser = new User({
      username: info.username,
      easySolved: info.easySolved,
      mediumSolved: info.mediumSolved,
      hardSolved: info.hardSolved,
      totalSolved: info.totalSolved
    });
    // console.log('my new user is: ', newUser);
    newUser.save((err, user) => {
      if (err) {
        return next(err);
      } else {
        console.log('saved user is:', user);
        return next();
      }
    });
  },

  deleteUser(req, res, next) {
    // pull name from button
    const nameToDelete = ''; // <- incomplete
    User.findOneAndDelete({ username: nameToDelete }, (err, student) => {
      // error handling
      if (nameToDelete === null) {
        return next({ err });
      }
      return next();
    });
  }
};

module.exports = UserController;