var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var landscapeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author:{
            id:{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User"
               },
            nameUser: String //username
            },
   comments:[
               {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Comment"
               }
      ]
});

module.exports = mongoose.model("Landscape", landscapeSchema);