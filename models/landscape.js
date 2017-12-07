var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var landscapeSchema = new mongoose.Schema({
   name: String,
   image: String,
   location: String,
   lat: Number,
   lng: Number,
   description: String,
   createdAt: {type: Date, default: Date.now},
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