const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
    title:{
    type:mongoose.Schema.Types.String,
    required:true,
    unique:true
    },
    tags:{
    required:true,
    type:[String]
    },
    completed:{
    type:Boolean,
    default: false
    }
    },{
    timestamps:true
    })
    module.exports = mongoose.model('Todo', todoSchema)