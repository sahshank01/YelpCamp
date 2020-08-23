var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

data = [
  {
    name: "cloud rest's",
    image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "bla bla bla",
    comments:[]
  },
  {
    name: "Silent Hill",
    image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "bla bla bla",
    comments:[]
  },
  {
    name: "Jeorge Caves",
    image: "https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "bla bla bla",
    comments:[]
  },
  {
    name: "Milky Way Heiest",
    image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074407d2f7cd69f4bcd_340.jpg",
    description: "bla bla bla",
    comments:[]
  }
];
// clear all campgrounds
function seedDB() {
  Campground.remove({}, (err) => {
    if (err)  
      console.log("error while deleteing");
    else {
      console.log("removed campgrounds");
      data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
          if (err)
            console.log("error");
          else
            console.log("campground created");
            //create comment on each campground
            Comment.create({
              text:"this place is great, But i wish there was internet",
              author:"shashank sah"
            },(err,comment)=>{
              if(err)
                console.log("error occoured");
              else{
                campground.comments.push(comment);
                campground.save();
                console.log("created new comment");
              }
            })
        })
      })
    }
  })
}



module.exports = seedDB;
