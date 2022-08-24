var express = require('express');
var router = express.Router();
var Product = require('../model/product')
var User = require('../model/user')
const auth = require("../middleware/auth");


/* GET home page. */
router.get('/',auth, function(req, res, next) {
  Product.find(function(err,products){
    let productChunks = [];
    let chunkSize = 4;
    for(let i = 0; i < products.length; i += chunkSize){
      productChunks.push(products.slice(i,i + chunkSize));
    }
    res.render('shop/index', { title:'Products', productList:productChunks,productsExists:productChunks.length > 0,id:req.session.user._id,isLoggedIn:true,data:req.session.user});
  })
});

module.exports = router;
