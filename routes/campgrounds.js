var express = require("express");
var router = express.Router();
var Campground= require("../models/campground");
//show campgrounds
router.get("/campgrounds",(req,res)=>{
  Campground.find({},function(err,campgrounds){
    if(err){
      console.log("error while searching");
    }
    else{
      res.render("campgrounds/index",{campgrounds:campgrounds});
    }
  });
})


//display form to create new campground
router.get("/campgrounds/new",isLoggedIn,(req,res)=>{
  res.render("campgrounds/new");
})

//create campground
router.post("/campgrounds",isLoggedIn,(req,res)=>{
  let author = {
    id:req.user._id,
    username:req.user.username
  };
  let campData={name:req.body.name,image:req.body.image, description:req.body.description,author:author};
  Campground.create(campData,function(err,campground){
    if(err)
    console.log("unable to create camp ground");
    else
    console.log("campground created");
  });
  res.redirect("/campgrounds");
})

router.get("/campgrounds/:id",(req,res)=>{
  Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
    if(err){
      console.log("error while searching");
    }
    else{
      res.render("campgrounds/show",{campground:campground});
    }
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
    return next();
  else  
    res.redirect("/login");
}

module.exports = router;