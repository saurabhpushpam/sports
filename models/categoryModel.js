const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
     category:{
         type: String,
         required: true
     }
});

module.exports= mongoose.model("category", userSchema);