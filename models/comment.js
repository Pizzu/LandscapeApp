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
         },
   createdAt:{type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment",commentSchema);