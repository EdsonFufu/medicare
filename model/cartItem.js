const mongoose = require("mongoose");
const Schema = mongoose.Schema

const schema = new Schema({
    photo:{type:String,required:true},
    product:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Product'},
    productName:{type:String,required:true},
    description:{type:String,required:true},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
    total:{type:Number,required:true},
    cart:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Cart'}
},{timestamps:true})

module.exports = mongoose.model('CartItem',schema)