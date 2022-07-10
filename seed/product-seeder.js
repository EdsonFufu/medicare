// var Product = require('../model/product')
// var mongoose = require("mongoose")
// mongoose.connect('mongodb://localhost:27017/medicare')
// console.log("Starting init products");
// var products = [
//     new Product({
//         _id:100,
//         imagePath:"https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/panadol/en_eg/Products/455x455-Advance-eng%20eg_new.jpg",
//         title:"Panadol Advance 500 mg Tablets",
//         description:"Panadol Advance 500 mg Tablets are faster absorbed than standard paracetamol tablets",
//         price:7000,
//         available:200
//     }),
//     new Product({
//         _id:101,
//         imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf4yxjVnXdhICQ_J-ZSdgH0k87FOPrJQA2w&usqp=CAU",
//         title:"Deep Heat Max Strength (35g)",
//         description:"Deep Heat Max Strength is a more intense heat rub that generates a deep sensation of warmth for the relief of muscular aches and pains.  Also suitable for use as a warm up rub for those who prefer a more fiery feel.  Despite its powerful warming effect, the lotion itself is light and non-greasy making it very easy to rub in. ",
//         price:10000,
//         available:200
//     }),
//     new Product({
//         _id:102,
//         imagePath:"https://i5.walmartimages.com/asr/569bac63-4dba-46c4-ae72-1a5fc0c08f9d.e38e28147066e50fcb9b0b1e852524e4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
//         title:"Diclofenac",
//         description:"Diclofenac : Active Pill That Deal with Painful Conditions Like Arthritis, Sprains and Strains, Gout, Migraine and Dental Pain. (Paperback)",
//         price:20000,
//         available:200
//     }),
//     new Product({
//         _id:103,
//         imagePath:"https://target.scene7.com/is/image/Target/GUEST_87a0606a-7a1e-4dcd-9e37-eefee87a68fb?wid=488&hei=488&fmt=pjpeg",
//         title:"instant ice pack",
//         description:"Instant Ice Packs are designed to provide immediate cold therapy for sports injuries such as sprains, strains and pulled muscles. ",
//         price:2000,
//         available:200
//     }),
//     new Product({
//         _id:104,
//         imagePath:"https://onemg.gumlet.io/image/upload/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/v1614865997/wojiy5mrlumc1oqwdij7.jpg",
//         title:"Volini Pain Relief Gel",
//         description:"Volini Gel is a pain relief gel which provides effective relief from muscle pain, strains, sprains, spasms and cramps. Scientifically formulated with ingredients such as diclofenac diethylamine, methyl salicylate, menthol and linseed oil, it provides effective relief from backache, knee pain and shoulder pain.",
//         price:4000,
//         available:200
//     })
// ]

// console.log(products)

// let done = 0;


// for(let i = 0; i < products.length; i++){
//     console.log("Save Product:" + i);
//     products[i].save(function(err,result){
//         console.log(result);
//         done++;
//         if(done === products.length){
//             console.log("Done");
//             exit();
//         }
//     });
// }

// function exit(){
//     mongoose.disconnect();
// }

// console.log("End init products");