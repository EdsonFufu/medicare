const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = new Schema({
    imagePath:{type:String,required:true},
    name:{type:String,required:true},
    size:Number,
    mimeType:String,
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
},{timestamps:true})

module.exports = mongoose.model('Photo',schema)