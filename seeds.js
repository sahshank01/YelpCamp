var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

data = [
  {
    name: "cloud rest's",
    image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit. Aliquam vestibulum morbi blandit cursus. Neque convallis a cras semper auctor. Eget nulla facilisi etiam dignissim diam. Sollicitudin nibh sit amet commodo. Tortor consequat id porta nibh venenatis cras. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Molestie ac feugiat sed lectus vestibulum. Malesuada proin libero nunc consequat interdum varius sit amet. Aliquam sem fringilla ut morbi tincidunt augue. Faucibus pulvinar elementum integer enim neque volutpat ac. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Suspendisse sed nisi lacus sed viverra tellus in. Pretium aenean pharetra magna ac. Tellus cras adipiscing enim eu turpis. Arcu risus quis varius quam quisque id diam vel. Luctus accumsan tortor posuere ac. Netus et malesuada fames ac turpis egestas.",
    comments:[]
  },
  {
    name: "Silent Hill",
    image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit. Aliquam vestibulum morbi blandit cursus. Neque convallis a cras semper auctor. Eget nulla facilisi etiam dignissim diam. Sollicitudin nibh sit amet commodo. Tortor consequat id porta nibh venenatis cras. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Molestie ac feugiat sed lectus vestibulum. Malesuada proin libero nunc consequat interdum varius sit amet. Aliquam sem fringilla ut morbi tincidunt augue. Faucibus pulvinar elementum integer enim neque volutpat ac. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Suspendisse sed nisi lacus sed viverra tellus in. Pretium aenean pharetra magna ac. Tellus cras adipiscing enim eu turpis. Arcu risus quis varius quam quisque id diam vel. Luctus accumsan tortor posuere ac. Netus et malesuada fames ac turpis egestas.",
    comments:[]
  },
  {
    name: "Jeorge Caves",
    image: "https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit. Aliquam vestibulum morbi blandit cursus. Neque convallis a cras semper auctor. Eget nulla facilisi etiam dignissim diam. Sollicitudin nibh sit amet commodo. Tortor consequat id porta nibh venenatis cras. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Molestie ac feugiat sed lectus vestibulum. Malesuada proin libero nunc consequat interdum varius sit amet. Aliquam sem fringilla ut morbi tincidunt augue. Faucibus pulvinar elementum integer enim neque volutpat ac. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Suspendisse sed nisi lacus sed viverra tellus in. Pretium aenean pharetra magna ac. Tellus cras adipiscing enim eu turpis. Arcu risus quis varius quam quisque id diam vel. Luctus accumsan tortor posuere ac. Netus et malesuada fames ac turpis egestas.",
    comments:[]
  },
  {
    name: "Milky Way Heiest",
    image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e5074407d2f7cd69f4bcd_340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit. Aliquam vestibulum morbi blandit cursus. Neque convallis a cras semper auctor. Eget nulla facilisi etiam dignissim diam. Sollicitudin nibh sit amet commodo. Tortor consequat id porta nibh venenatis cras. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Molestie ac feugiat sed lectus vestibulum. Malesuada proin libero nunc consequat interdum varius sit amet. Aliquam sem fringilla ut morbi tincidunt augue. Faucibus pulvinar elementum integer enim neque volutpat ac. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Suspendisse sed nisi lacus sed viverra tellus in. Pretium aenean pharetra magna ac. Tellus cras adipiscing enim eu turpis. Arcu risus quis varius quam quisque id diam vel. Luctus accumsan tortor posuere ac. Netus et malesuada fames ac turpis egestas.",
    comments:[]
  }
];
// clear all campgrounds
function seedDB() {
  Campground.remove({}, (err) => {
    if (err)  
      console.log("error while deleteing");
    else {
      Comment.remove({},(err)=>{
        if(err)
          console.log("error while deleting");
        else{
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
  })
}



module.exports = seedDB;
