var express = require("express");
var router  = express.Router();
var Landscape = require("../models/landscape");


//=================================
//        LANDSCAPE ROUTES
//=================================
//INDEX
router.get("/landscapes", function(req, res){
    Landscape.find({}, function(err,allLandscapes){
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/landscapes");
        } else {
            res.render("landscapes/index", {landscapes: allLandscapes});
        }
    });
});
//NEW
router.get("/landscapes/new", function(req, res){
   res.render("landscapes/new"); 
});
//POST ROUTE
router.post("/landscapes", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newLandscape = {name:name, image:image, description:description};
   Landscape.create(newLandscape, function(err, landscape){
      if(err){
          req.flash("error", "Something went wrong!");
          res.redirect("/landscapes");
      } else {
          console.log(landscape);
          res.redirect("/landscapes");
      }
   });
});
//SHOW PAGE
router.get("/landscapes/:id", function(req, res) {
   Landscape.findById(req.params.id).populate("comments").exec(function(err, foundLandscape){
       if(err || !foundLandscape){
           req.flash("error", "Landscape not found!");
           res.redirect("/landscapes");
       } else {
           res.render("landscapes/show", {landscape: foundLandscape});
       }
   }); 
});

//EDIT PAGE
router.get("/landscapes/:id/edit", function(req, res) {
   Landscape.findById(req.params.id, function(err, foundLandscape){
      if(err){
          req.flash("error", "Landscape not found!");
          res.redirect("/landscapes/" + req.params.id);
      } else {
          res.render("landscapes/edit", {landscape: foundLandscape});
      }
   }); 
});

//PUT
router.put("/landscapes/:id", function(req, res){
    var landscapeObj = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description
    };
    Landscape.findByIdAndUpdate(req.params.id,{$set: landscapeObj},function(err, updatedLandscape){
       if(err){
           req.flash("error", "Something went wrong");
           res.redirect("/landscapes/" + req.params.id);
       } else {
           res.redirect("/landscapes/" + req.params.id);
       }
    });
});

//DESTROY ROUTE
router.delete("/landscapes/:id", function(req, res){
   Landscape.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash("error", "Something went wrong");
           res.redirect("/landscapes/" + req.params.id);
       } else {
           res.redirect("/landscapes");
       }
   }); 
});

module.exports = router;