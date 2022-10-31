const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    imagePath:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    information:{type:String,required:true},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    price:{type:Number,required:true},
    available:{type:Number,required:true},
    discount:{type:Number,required:true}
},{timestamps:true},{count:true})

// Specifying a virtual with a `ref` property is how you enable virtual
// population
productSchema.virtual('photos', {
    ref: 'Photo',
    localField: '_id',
    foreignField: 'product'
});

productSchema.virtual('numberOfPhotos', {
    ref: 'Photo',
    localField: '_id',
    foreignField: 'product',
    count:true
});

module.exports = mongoose.model('Product',productSchema)