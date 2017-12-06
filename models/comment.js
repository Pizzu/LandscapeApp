var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var commentSchema = new mongoose.Schema({
   text: String,
   author:{
            id:{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User"
               },
            nameUser: String // username
         }
});

module.exports = mongoose.model("Comment",commentSchema);