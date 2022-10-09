const express = require("express")
const auth = require("../middleware/auth");
const Cart = require("../model/cart");
const Product = require("../model/product");
const Photo = require("../model/photo");
const router = express.Router()

/* GET Cart List. */
router.get('/',auth, function(req, res, next) {
    Cart.find(function(err,carts){
        res.render('carts/index', { title:'Carts', userList:carts,usersExists:carts.length > 0,id:req.session.user._id,isLoggedIn:true,data:req.session.user});
    })

});


router.get("/:id",auth,(req,res) => {
    const id = req.params.id
    Cart.findOne({'_id':id}).populate("cartItem").then(async result => {
        let productId = result.cartItem.productId
        let photos = []
        await Photo.find({productId}).then(images => {
            images.forEach(img => {
                photos.push({path: img.imagePath, name: img.name})
            })
        })
        console.log("Photos", photos)
        res.render('carts/view', {
            title: `Cart#${id}`,
            cart: result,
            cardExists: true,
            id: req.session.user._id,
            isLoggedIn: true,
            user: req.session.user,
            photos
        });
    }).catch(e => {
        throw e;
    });


})

module.exports = router