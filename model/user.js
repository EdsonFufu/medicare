var mongoose = require('mongoose');
var Schema = mongoose.Schema

var schema = new Schema({
    _id:Number,
    imagePath:{type:String,required:true},
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userRole:{type:String,required:true},
    isActive:{type:String,required:true}
})

module.exports = mongoose.model('User',schema)