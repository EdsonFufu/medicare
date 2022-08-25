const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    imagePath:{type:String,required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
},{timestamps:true})

module.exports = mongoose.model('Category',categorySchema)