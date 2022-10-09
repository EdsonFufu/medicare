const mongoose = require("mongoose")
const Schema = mongoose.Schema
const trackOrderSchema = new Schema({
    orderId:{type:Schema.Types.ObjectId,ref:'Order'},
    inProcess:{type:Boolean,default:false},
    shipped:{type:Boolean,default:false},
    delivered:{type:Boolean,default:false},
    cancelled:{type:Boolean,default:false},
    returned:{type:Boolean,default:false},
    feedback:{type:String,default:""}
},{timestamps:true})

module.exports = new mongoose.model('TrackOrder',trackOrderSchema)