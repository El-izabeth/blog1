const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{type:String,default:""},
    content:{type:String,default:""},
    author:{type:String,required:true},
    likesCount:{type:Number,required:true,default:0},
    isPublished:{type:Boolean,default:false}
},{ timestamps: true });

module.exports = mongoose.model("Post", PostSchema);