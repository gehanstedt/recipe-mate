// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      full_name: req.body.full_name
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // POST Route to add a favorite recipe 
  // Parameters (all come from body)
  //    user_id - ID of the user associated to the favorite
  //    title - text title for the favorite
  //    url - URL for the favorite
  //    image_url - URL for the image (optional)
  //    rating:  integer (0 - 5) for the rating
  // Returns:
  //     JSON object (dbPost)
  app.post("/api/favorite", function(req, res) {
  //
    db.Favorite_recipe.create({
      user_id: req.body.user_id,
      title: req.body.title,
      url: req.body.url,
      image_url: req.body.image_url,
      rating: req.body.rating,
    })
      .then(function() {
        // This code below needs to be replaced wiht maybe just a thing back saying "success".
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // PUT route to update the rating on a specific favorite
  // Parameters:
  //    id - ID of the favorite - from the body
  //    rating - integer (0 - 5) that the rating should be - from body
  // Returns:
  //     JSON object (dbPost)
  app.put("/api/rating", function(req, res) {
    db.Favorite_recipe.update({
      rating: req.body.rating,
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
    });
  });

  // GET route to return all favorites for a given user
  // Parameters:
  //    user_id - ID of the user - from the body
  // Returns:
  //     JSON object (dbPost)
  app.get("/api/favorite", function(req, res) {
    console.log (req.body.user_id);
    db.Favorite_recipe.findAll({
      where: {
        user_id: req.body.user_id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};

