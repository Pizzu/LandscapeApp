var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

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
             res.redirect("/landscapes");
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
    successRedirect: "/landscapes",
    failureRedirect: "/login",
    failureFlash: true
}));

//logout logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/landscapes");
});

//Esportazione router
module.exports = router;