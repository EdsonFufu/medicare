const mongoose = require("mongoose");
const Schema = mongoose.Schema

const schema = new Schema({
    cartId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Cart'},
    photo:{type:String,required:true},
    productId:{type:String,required:true},
    productName:{type:String,required:true},
    description:{type:String,required:true},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true}
},{timestamps:true})

module.exports = mongoose.model('CartItem',schema)