const mongoose = require("mongoose");
const Schema = mongoose.Schema
const invoiceSchema = new Schema({
    order:{type:Schema.Types.ObjectId,required: true,ref:'Order'},
    cart:{type:Schema.Types.ObjectId,required: true,ref:'Cart'},
    paymentMethod:{type:String,required:true},
    amount:{type:Number,required:true},
    issueDate:{type:String,required:true},
    dueDate:{type:String,required:true},
    paid:{type:Boolean,required:true},
    contact:{type:Schema.Types.ObjectId,required: true,ref:'Contact'}
},{timestamps:true})

module.exports = new mongoose.model('Invoice',invoiceSchema)