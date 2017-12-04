//=================================
//            SETUP
//=================================
var express     = require("express"),
    app         = express(),
    bodyParser = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");
    
//requiring routes
var landscapeRoutes = require("./routes/landscapes");

//mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/landscapedb_v1", {useMongoClient: true});

//Other setups
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.use(landscapeRoutes);


//=================================
//            SERVER
//=================================
app.listen(process.env.PORT, process.env.IP, function(){
        console.log("The server has started"); 
});