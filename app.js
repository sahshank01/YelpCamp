let express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app=express();

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))


//schema setup
var campgroundSchema=mongoose.Schema(({
  name:String,
  image:String
}));

var Campground = mongoose.model("Campground",campgroundSchema);

app.get("/",(req,res)=>{
  res.render("landing");
})

app.get("/campgrounds",(req,res)=>{
  Campground.find({},function(err,campgrounds){
    if(err){
      console.log("error while searching");
    }
    else{
      res.render("campgrounds",{campgrounds:campgrounds});
    }
  });
})

app.get("/campgrounds/new",(req,res)=>{
  res.render("new");
})

app.post("/campgrounds",(req,res)=>{
  let campData={name:req.body.name,image:req.body.image};
  Campground.create(campData,function(err,campground){
    if(err)
    console.log("unable to create camp ground");
    else
    console.log("campground created");
  });
  res.redirect("/campgrounds");
})

app.listen(3000,()=>{
  console.log("YelpCamp server has started...");
})