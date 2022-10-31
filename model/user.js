const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    imagePath: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userRole: {type: String, required: true},
    isActive: {type: String, required: true},
}, {timestamps: true});

userSchema.virtual('carts', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'user'
});


userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'user'
});

userSchema.virtual('contacts', {
    ref: 'Contact',
    localField: '_id',
    foreignField: 'user'
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User',userSchema)