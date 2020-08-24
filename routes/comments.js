var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var Campground= require("../models/campground");
//adding new comment to a particular campground
router.get("/campgrounds/:id/comments/new",isLoggedIn,(req,res)=>{
  Campground.findById(req.params.id,(err,campground)=>{
    if(err)
      console.log("error occoured");
    else
      res.render("comments/new",{campground:campground});
  })
  
})

router.post("/campgrounds/:id/comments",isLoggedIn,(req,res)=>{
  Campground.findById(req.params.id,(err,campground)=>{
    if(err){
      console.log("error occoured");
      res.redirect("/campgrounds");
    }
    else{
      Comment.create(req.body.comment,(err,comment)=>{
        if(err)
          console.log("error occoured");
        else{
          comment.author.id=req.user._id;
          comment.author.username=req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log("created new comment");
          res.redirect("/campgrounds/"+campground._id);
        }
      })
    }
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
    return next();
  else  
    res.redirect("/login");
}

module.exports = router;