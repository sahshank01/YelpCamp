let express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground= require("./models/campground.js");
var seedDB = require("./seeds");

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
      res.render("index",{campgrounds:campgrounds});
    }
  });
})


//display form to create new campground
app.get("/campgrounds/new",(req,res)=>{
  res.render("new");
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
      res.render("show",{campground:campground});
    }
  });
})

app.listen(3000,()=>{
  console.log("YelpCamp server has started...");
})