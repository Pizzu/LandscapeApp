var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Landscape = require("../models/landscape");
var middleware = require("../middleware");

//=================================
//          AUTH ROUTES
//=================================

//Show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//Register the user with a post request
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username, nameUser: req.body.nameUser});
   User.register(newUser, req.body.password, function(err, user){
      if(err){
          req.flash("error", err.message);
          res.redirect("/register");
      } else {
          passport.authenticate("local")(req, res, function(){
             req.flash("success", "Welcome " + user.nameUser);
             res.redirect("/");
          });
      }
   });
});

//Show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handle login logic
router.post("/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

//logout logic
router.get("/logout", middleware.isLoggedIn, function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

//User Profile
router.get("/users/:id", function(req, res) {
   User.findById(req.params.id, function(err, foundUser){
      if(err || !foundUser){
          req.flash("error", "Something went wrong");
          res.redirect("/");
      } else {
          Landscape.find().where("author.id").equals(foundUser._id).exec(function(err, allLandscapes){
             if(err){
                 req.flash("error", "Something went wrong");
                 res.redirect("/");
             }
             res.render("users/show", {user: foundUser, landscapes: allLandscapes});
          });
      }
   }); 
});

//Esportazione router
module.exports = router;