var Landscape = require("../models/landscape");
var Comment = require("../models/comment");
//all the middleware goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

middlewareObj.checkLandscapeOwnership = function(req, res, next){
    if(req.isAuthenticated()){
         Landscape.findById(req.params.id, function(err, foundLandscape){
           if(err || !foundLandscape){
               req.flash("error", "Landscape not found!");
               res.redirect("/");
           } else {
               if(foundLandscape.author.id.equals(req.user._id)){//metodo di mongoose(author.id è un oggetto non una stringa)
                    next();
               } else { 
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("/landscapes/" + req.params.id);             
               }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login"); 
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err || !foundComment){
          req.flash("error", "Something went wrong!");
          res.redirect("/");        
        } else {
          if(foundComment.author.id.equals(req.user._id)){
            next();
          } else {
             req.flash("error", "You don't have permission to do that!");
             res.redirect("/");      
          }
        }
    });
  } else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
  }
};

module.exports = middlewareObj;