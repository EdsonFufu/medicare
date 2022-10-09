const mongoose = require("mongoose")

const Schema = mongoose.Schema

const contactSchema = new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    email:{type:String,required:true},
    mobile:{type:String,required: true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true}
},{timestamps:true})

module.exports = new mongoose.model('Contact',contactSchema)