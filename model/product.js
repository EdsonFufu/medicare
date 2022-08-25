var mongoose = require('mongoose');
var Schema = mongoose.Schema

var schema = new Schema({
    imagePath:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    information:{type:String,required:true},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    price:{type:Number,required:true},
    available:{type:Number,required:true},
    discount:{type:Number,required:true}
},{timestamps:true})

module.exports = mongoose.model('Product',schema)