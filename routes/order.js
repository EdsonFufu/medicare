const express = require("express")
const auth = require("../middleware/auth");
const Order = require("../model/order");
const Photo = require("../model/photo");
const router = express.Router()

/* GET Cart List. */
router.get('/', auth,function(req, res, next) {
    Order.find(function(err,orders){
        res.render('orders/index', { title:'Orders', data:orders,exists:orders.length > 0,id:req.session.user._id,isLoggedIn:true,user:req.session.user});
    })
});


router.get("/:id",auth,(req,res) => {
    const id = req.params.id
    Order.findOne({'_id':id}).populate("cart").populate("user").then(async result => {
        // let productId = result.cartItem.productId
        // let photos = []
        // await Photo.find({productId}).then(images => {
        //     images.forEach(img => {
        //         photos.push({path: img.imagePath, name: img.name})
        //     })
        // })
        // console.log("Photos", photos)
        res.render('orders/view', {
            title: `Order#${id}`,
            data: result,
            cardExists: true,
            id: req.session.user._id,
            isLoggedIn: true,
            user: req.session.user,
            //photos
        });
    }).catch(e => {
        throw e;
    });


})

module.exports = router