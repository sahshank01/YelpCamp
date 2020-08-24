var express = require("express");
var router = express.Router();
User = require("../models/user");
var passport = require("passport");

router.get("/",(req,res)=>{
  res.render("landing");
})

//AUTH ROUTES
//show register form
router.get("/register",(req,res)=>{
  res.render("register");
})

//handle sign up
router.post("/register",(req,res)=>{
  let newUser = new User({username:req.body.username});
  User.register(newUser,req.body.password,(err,user)=>{
    if(err){
      console.log("error"+err);
      res.render("register");
    }
    else{
      passport.authenticate("local")(req,res,()=>{
        res.redirect("/campgrounds");
      })
    }
  })
})

//LOGIN ROUTE
router.get("/login",(req,res)=>{
  res.render("login");
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}),(req,res)=>{
})

//LOGOUT ROUTE
router.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/campgrounds");
})

module.exports = router;