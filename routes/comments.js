var express = require("express");
var router  = express.Router();
var Landscape = require("../models/landscape");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=================================
//        COMMENT ROUTES
//=================================
router.get("/landscapes/:id/comments/new", middleware.isLoggedIn, function(req, res){
   Landscape.findById(req.params.id, function(err, foundLandscape){
      if(err || !foundLandscape){
          req.flash("error", "Landscape not found!");
          res.redirect("/landscapes/" + req.params.id);
      } else {
          res.render("comments/new", {landscape: foundLandscape});
      }
   }); 
});
//POST
router.post("/landscapes/:id/comments", middleware.isLoggedIn, function(req, res){
    Landscape.findById(req.params.id, function(err, foundLandscape){
       if(err || !foundLandscape){
           req.flash("error", "Landscape not found");
           res.redirect("/landscapes/" + req.params.id);
       }  else {
            var commentObj = {
                text: req.body.text
            };
            Comment.create(commentObj, function(err, comment){
                if(err || !foundLandscape){
                   req.flash("error", "Something went wrong");
                   res.redirect("/landscapes/" + req.params.id);
               } else {
                   comment.author.id = req.user._id;
                   comment.author.nameUser = req.user.nameUser;
                   comment.save();
                   foundLandscape.comments.push(comment);
                   foundLandscape.save();
                   res.redirect("/landscapes/" + req.params.id);
               }
            });
       }
    });
});
//EDIT
router.get("/landscapes/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Landscape.findById(req.params.id, function(err, foundLandscape) {
       if(err || !foundLandscape){
           req.flash("error", "Landscape not found!");
           res.redirect("/landscapes/" + res.params.id);
       } else {
           Comment.findById(req.params.comment_id, function(err, foundComment) {
               if(err){
                   req.flash("error", "Something went wrong");
                   res.redirect("/landscape/" + res.params.id);
               } else {
                   res.render("comments/edit",{landscape: foundLandscape, comment: foundComment});
               }
           });
       }
   }); 
});
//UPDATE
router.put("/landscapes/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   var commentObj = {
       text: req.body.text
   };    
   Comment.findByIdAndUpdate(req.params.comment_id,{$set: commentObj}, function(err, updatedComment){
       if(err){
           req.flash("error","Something went wrong");
           res.redirect("/landscapes/" + req.params.id);
       } else {
           res.redirect("/landscapes/" + req.params.id);
       }
   }); 
});
//DESTROY
router.delete("/landscapes/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           req.flash("error", "Something went wrong");
           res.redirect("/landscapes/" + req.params.id);
       } else {
           res.redirect("/landscapes/" + req.params.id);
       }
   }); 
});

module.exports = router;