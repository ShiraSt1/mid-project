const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    title:{
    type:mongoose.Schema.Types.String,
    required:true,
    unique:true
    },
    body:{
    type:String,
    required:true
    }
    },{
    timestamps:true
    })
    module.exports = mongoose.model('Post', postSchema)