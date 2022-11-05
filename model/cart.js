const mongoose = require("mongoose");
const Schema = mongoose.Schema

const cartSchema = new Schema({
    sessionId:{type:String,required:true},
    quantity:{type:Number,required:true},
    total:{type:Number,required:true},
    user:{type:Schema.Types.ObjectId,ref:'User'},
    orderCreated:{type:Boolean,required:true}
},{timestamps:true})

cartSchema.virtual('items', {
    ref: 'CartItem',
    localField: '_id',
    foreignField: 'cart'
});

cartSchema.set('toObject', { virtuals: true });
cartSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cart',cartSchema)