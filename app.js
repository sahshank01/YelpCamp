let express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");

User = require("./models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");

//seedDB();
const app=express();

//adding routes
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var authRoutes  = require("./routes/index");


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

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000,()=>{
  console.log("YelpCamp server has started...");
})