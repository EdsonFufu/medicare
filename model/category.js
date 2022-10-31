const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    imagePath:{type:String,required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
   // products: [{type: mongoose.Schema.Types.ObjectId}],
},{timestamps:true})

// Specifying a virtual with a `ref` property is how you enable virtual
// population
categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
});
categorySchema.virtual('totalProducts', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
    count: true
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Category',categorySchema)