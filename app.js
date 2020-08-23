let express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground= require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");

seedDB();

const app=express();

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))

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
app.get("/campgrounds/new",(req,res)=>{
  res.render("campgrounds/new");
})

//create campground
app.post("/campgrounds",(req,res)=>{
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
app.get("/campgrounds/:id/comments/new",(req,res)=>{
  Campground.findById(req.params.id,(err,campground)=>{
    if(err)
      console.log("error occoured");
    else
      res.render("comments/new",{campground:campground});
  })
  
})

app.post("/campgrounds/:id/comments",(req,res)=>{
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

app.listen(3000,()=>{
  console.log("YelpCamp server has started...");
})