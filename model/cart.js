const mongoose = require("mongoose");
const Schema = mongoose.Schema

const schema = new Schema({
    userId:{type:Schema.Types.ObjectId,required:true,ref:'User'},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
    total:{type:Number,required:true},
    cartItem:[{type:Schema.Types.ObjectId,ref:'CartItem'}]
},{timestamps:true})

module.exports = mongoose.model('Cart',schema)