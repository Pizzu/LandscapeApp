var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var landscapeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

module.exports = mongoose.model("Landscape", landscapeSchema);