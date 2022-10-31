const mongoose = require("mongoose");
const Schema = mongoose.Schema
const orderSchema = new Schema({
    user:{type:Schema.Types.ObjectId,required: true,ref:'User'},
    cart:{type:Schema.Types.ObjectId,required: true,ref:'Cart'},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
    total:{type:Number,required:true},
    tax:{type:Number,required:true},
    subTotal:{type:Number,required:true},
    shipping:{type:Number,required:true},
    grandTotal:{type:Number,required:true}
},{timestamps:true})

module.exports = new mongoose.model('Order',orderSchema)