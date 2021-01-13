var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // Varaiable validLogin initially set to true. But, if either test fails, it is set to false and login fails
      var validLogin = true;

      // If there's no user with the given email
      if (!dbUser) {
        validLogin = false;
      }

      // If there is a user with the given email, but the password the user gives us is incorrect
      if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }

      if (validLogin) {
      // username and password both matched, return valid login
        return done(null, dbUser);
      }

      // Must not have a valid login, and just to catch all - return invalid.
      return done(null, false, {
        message: "Incorrect email and/or password."
      });
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
