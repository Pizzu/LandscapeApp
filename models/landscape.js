var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var landscapeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments:[
               {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Comment"
               }
      ]
});

module.exports = mongoose.model("Landscape", landscapeSchema);