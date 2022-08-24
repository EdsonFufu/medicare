var mongoose = require('mongoose');
var Schema = mongoose.Schema

var schema = new Schema({
    imagePath:{type:String,required:true},
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userRole:{type:String,required:true},
    isActive:{type:String,required:true}
},{timestamps:true})

module.exports = mongoose.model('User',schema)