const mongoose = require("mongoose")
const Schema = mongoose.Schema

const settingSchema = new Schema({
    campanyName:{type:String,required:true},
    address:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    shipping:{type:Number,required:true},
    tax:{type:Number,required:true},
},{timestamps:true
})

module.exports = mongoose.model('Setting',settingSchema)