const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    imagePath: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userRole: {type: String, required: true},
    isActive: {type: String, required: true},
    cart: [{type: Schema.Types.ObjectId,ref:'Cart'}]
}, {timestamps: true});

module.exports = mongoose.model('User',schema)