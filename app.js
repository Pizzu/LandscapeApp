//=================================
//            SETUP
//=================================
var express     = require("express"),
    app         = express(),
    bodyParser = require("body-parser"),
    mongoose    = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    User = require("./models/user");
    
//requiring routes
var landscapeRoutes = require("./routes/landscapes");
var commentRoutes   = require("./routes/comments");
var indexRoutes     = require("./routes/index");

//mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/landscapedb_v4", {useMongoClient: true});

//Other setups
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//MOMENT JS
app.locals.moment = require("moment");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I love dogs and coding all day",
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//END PASSPORT CONFIGURATION

app.use(function(req, res, next){
   res.locals.currentUser = req.user; //invio ad ogni template l'oggetto currentUser
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next(); //dobbiamo sempre usarlo se no ci blocchiamo 
});

app.use(landscapeRoutes);
app.use(commentRoutes);
app.use(indexRoutes);



//=================================
//            SERVER
//=================================
app.listen(process.env.PORT, process.env.IP, function(){
        console.log("The server has started"); 
});