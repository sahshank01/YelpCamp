let express = require("express");
const app=express();

app.set("view engine","ejs");

app.get("/",(req,res)=>{
  res.render("landing");
})

app.get("/campgrounds",(req,res)=>{
  let campgrounds=[
    {name:"salmon Creek", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Granite Lake", image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Silent Hill", image:"https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&h=350"}
  ];
  res.render("campgrounds",{campgrounds:campgrounds});
})
app.listen(3000,()=>{
  console.log("YelpCamp server has started...");
})