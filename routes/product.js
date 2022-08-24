const express = require("express")
const auth = require("../middleware/auth");
const Product = require("../model/product");
const router = express.Router()


/* GET Products List. */
router.get('/', auth, function(req, res, next) {
    Product.find(function(err,products){
        res.render('products/index', { title:'Products', productList:products,productsExists:products.length > 0,id:req.session.user._id,isLoggedIn:true,data:req.session.user});
    })

});

/* GET Product By ID. */
router.get('/:id',auth, function(req, res, next) {
    var id = req.params.id
    var product = Product.find({'_id':id},(err,result) => {
        res.render('products/view', { title:`Product#${id}`, product:result,productsExists:result.length > 0,id:req.session.user._id,isLoggedIn:true,data:req.session.user});
    });
});

module.exports = router