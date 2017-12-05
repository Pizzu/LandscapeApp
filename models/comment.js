var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var commentSchema = new mongoose.Schema({
   text: String,
   author: String
});

module.exports = mongoose.model("Comment",commentSchema);