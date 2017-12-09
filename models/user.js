var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
   username: {type: String, unique: true, required: true}, //email
   nameUser: {type: String, unique: true, required: true}, // username
   password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);