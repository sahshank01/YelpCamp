let express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground= require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
User = require("./models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");


seedDB();

const app=express();

//passport config
app.use(require("express-session")({
  secret:"kkhdlsadf chr nweuruewincirou voioiuowuao",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static(__dirname+"/public"));
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))

app.use((req,res,next)=>{
  res.locals.currentUser=req.user;
  next();
})

app.get("/",(req,res)=>{
  res.render("landing");
})


//show campgrounds
app.get("/campgrounds",(req,res)=>{
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
app.get("/campgrounds/new",isLoggedIn,(req,res)=>{
  res.render("campgrounds/new");
})

//create campground
app.post("/campgrounds",isLoggedIn,(req,res)=>{
  let campData={name:req.body.name,image:req.body.image, description:req.body.description};
  Campground.create(campData,function(err,campground){
    if(err)
    console.log("unable to create camp ground");
    else
    console.log("campground created");
  });
  res.redirect("/campgrounds");
})

app.get("/campgrounds/:id",(req,res)=>{
  Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
    if(err){
      console.log("error while searching");
    }
    else{
      res.render("campgrounds/show",{campground:campground});
    }
  });
})

//adding new comment to a particular campground
app.get("/campgrounds/:id/comments/new",isLoggedIn,(req,res)=>{
  Campground.findById(req.params.id,(err,campground)=>{
    if(err)
      console.log("error occoured");
    else
      res.render("comments/new",{campground:campground});
  })
  
})

app.post("/campgrounds/:id/comments",isLoggedIn,(req,res)=>{
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
          campground.comments.push(comment);
          campground.save();
          console.log("created new comment");
          res.redirect("/campgrounds/"+campground._id);
        }
      })
    }
  })
})


//AUTH ROUTES
//show register form
app.get("/register",(req,res)=>{
  res.render("register");
})

//handle sign up
app.post("/register",(req,res)=>{
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
app.get("/login",(req,res)=>{
  res.render("login");
})

app.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}),(req,res)=>{
})

//LOGOUT ROUTE
app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/campgrounds");
})


function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
    return next();
  else  
    res.redirect("/login");
}

app.listen(3000,()=>{
  console.log("YelpCamp server has started...");
})