const express = require("express")
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jwt-then");
const auth = require("../middleware/auth-api");
const Category = require("../model/category");
const Product = require("../model/product");
const Cart = require("../model/cart");
const CartItem = require("../model/cartItem");
const Setting = require("../model/settings")
const Order = require("../model/order");
const Invoice = require("../model/invoice");
const Contact = require("../model/contact");
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');


const router = express.Router()

router.post("/login",(req,res) => {
    console.log("Credentials",req.body)
    if (!req.body.username || !req.body.password) {
        res.statusCode = 401
        res.send({message: "Invalid Request Data",body:{}});
    } else {
        const {username, password} = req.body;
        User.findOne({'email':username}).select({'fullname':1,'email':1,'password':1,'userRole':1,'isActive':1,'createdAt':1,'updatedAt':1}).limit(1).then(async usr => {
            console.log("User",usr)
            console.log("PostedPassword:",password)
            console.log("DBPassword:",usr.password)
            const isMatch = await bcrypt.compare(password, usr.password);
            if (!isMatch){
                console.log("Invalid Password")
                res.status(401).json({message: "Incorrect username or password",body:{}});
                return
            }

            console.log("Valid Password")
            const payload = {id: usr._id};
            console.log("Payload:",payload)
            await jwt.sign(
                payload,
                process.env.SECRET,
                {
                    expiresIn: 3600
                }
            ).then((token, err) =>{
                if (err) {
                    res.status(401).json({message: "Login Failed",body:{}})
                    return
                }
                console.log("Token Generated:",token)
                res.status(200).json({message:"Login Successful",body:{token,user:usr,sessionId:uuidv1()}});
            });

        }).catch(err => {
            console.log(err)
            res.statusCode = 401
            res.send({message: "Login Failed",body:{}})
        })
    }
})

router.post('/signup', async function (req, res) {
    if (!req.body.password || !req.body.email || !req.body.first_name || !req.body.last_name) {
        res.status("400").render("signup", {"message": "Invalid Request Data!",body:{}});
    } else {

        User.findOne({'email':req.body.email}).select({'fullname':1,'email':1,'password':1,'userRole':1,'isActive':1,'createdAt':1,'updatedAt':1}).then(usr => {
            console.log("Fetched user", usr)
            if (usr !== null) {
                res.status(400).json({message: "User Already Exists! Login or choose another user id",body:{}});
            }
        }).catch((error)=>{
            res.status(500).json({message: error,body:{}});
        })

        const salt = await bcrypt.genSalt(10)
        const newUser = new User({
            imagePath:"/images/account.png",
            firstname:req.body.first_name,
            lastname:req.body.last_name,
            fullname: req.body.first_name + " " + req.body.last_name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            userRole: 'ROLE_CUSTOMER',
            isActive: 'Yes'
        });

        newUser.save().then(async user => {
            console.log("New User Created:", token)
            await jwt.sign(
                {id: usr._id},
                process.env.SECRET,
                {
                    expiresIn: 3600
                }
            ).then((token, err) => {
                if (err) {
                    res.status(401).json({message: "Login Failed", body: {}})
                    return
                }
                console.log("Token Generated:", token)
                res.status(200).json({message: "Login Successful", body: {token, user: usr,sessionId:uuidv1()}});
            });

        }).catch(err => {
            console.error(err);
            res.status(400).json( {"message": "Sign Up Failed",body:{}})
        })
    }
});

router.get('/category', function(req, res, next) {
    Category.find({}).populate({path:'products',strictPopulate:false}).populate({'path':'totalProducts',strictPopulate:false}).then( results => {
        res.status(200).json({ message:'Success', body:results});
    }).catch(err => {
        console.error(err);
        res.status(400).json( {message: "Failed to get categories",body:{}})
    })
});

router.get('/category/:id', function(req, res, next) {
    Category.findOne({_id:req.params.id}).populate({path:'products',strictPopulate:false}).populate({path:'totalProducts',strictPopulate:false}).then( result => {
        res.status(200).json({ message:'Success', body:result});
    }).catch(err => {
        console.error(err);
        res.status(400).json( {message: "Failed to get category",body:{}})
    })
});

router.get('/product', function(req, res, next) {
    Product.find({}).populate({path:'category',strictPopulate:false}).populate({path:'photos',strictPopulate:true}).populate({path:'numberOfPhotos',strictPopulate:false}).then( result => {
        res.status(200).json({ message:'Success', body:result});
    }).catch(err => {
        console.error(err);
        res.status(400).json( {message: "Failed to get products",body:{}})
    })
});

router.get('/product/category/:id', function(req, res, next) {
    Product.find({category:req.params.id}).populate({path:'category',strictPopulate:false}).populate({path:'photos',strictPopulate:true}).populate({path:'numberOfPhotos',strictPopulate:false}).then( result => {
        res.status(200).json({ message:'Success', body:result});
    }).catch(err => {
        console.error(err);
        res.status(400).json( {message: "Failed to get products",body:{}})
    })
});

router.get('/product/:id', function(req, res, next) {
    Product.findOne({_id:req.params.id}).populate({path:'category',strictPopulate:false}).populate({path:'photos',strictPopulate:true}).then( result => {
        res.status(200).json({ message:'Success', body:result});
    }).catch(err => {
        console.error(err);
        res.status(400).json( {message: "Failed to get product",body:{}})
    })
});

router.get('/profile/:id', auth, async function(req, res, next) {
    User.findOne({_id:req.params.id}).populate({path:'cart',strictPopulate:false}).then( result => {
        res.status(200).json({ message:'Success', body:result});
    }).catch(err => {
        console.error(err);
        res.status(400).json( {message: "Failed to get User Profile",body:{}})
    })
});


router.get('/cart/:user', auth, function(req, res, next) {
    Cart.findOne({user:req.params.user}).populate({path:'items',strictPopulate:false}).populate({path:'user',strictPopulate:false}).then( result => {
        console.log("Cart:",result)
        if(result){
            res.status(200).json({ message:'Success', body:result});
            return
        }
        res.status(401).json({ message:'Not Found', body:{}});

    }).catch(err => {
        console.error(err);
        res.status(400).json( {message: "Failed to get cart details",body:{}})
    })
});

router.post('/cart/add-item', auth, async function (req, res, next) {
    console.log(req.body)

    const {sessionId, productId,user} = req.body;
    if (!sessionId || !productId || !user) {
        res.status("400").json({"message": "Invalid Request Data!", body: {}});
    } else {

        let product = await Product.findOne({_id: productId}).then(result => {
            return  result;
        })

        console.log("Product:",product)

        let cart = await Cart.findOne({user}).populate({path:'items',strictPopulate:false}).then(cart => {
            return cart
        })

        console.log("Cart:",cart)

        if(cart === null){
            const newCart = await new Cart({sessionId, quantity:1,price:product.price, total:1 * product.price, user}).save().then(cart => {
                return cart
            })

            console.log("New Cart:",newCart)

            const newItem = await new CartItem({
                photo: product.imagePath,
                product: productId,
                productName: product.title,
                description: product.description,
                quantity: 1,
                price:product.price,
                total: product.price,
                cart: newCart._id
            }).save().then(item => {
                return item
            })

            console.log("New Item:",newItem)

            res.status(200).json({"message": "Success!", body: await Cart.findOne({user}).populate({path:'items',strictPopulate:false}).then(cart => cart)});
            return
        }

        console.log("Cart Items:", cart.items)
        const cartItem = cart.items.find(item => item.product.toString() === productId)

        if(cartItem !== undefined){
            console.log("Searched Cart Item:",cartItem)
            cartItem.quantity += 1
            cartItem.total = cartItem.quantity * cartItem.price
            const updatedCartItem = await cartItem.save().then(newItem => {
                return newItem
            })
            console.log("UpdatedCartItem:",updatedCartItem)

            cart.quantity += 1
            cart.total = cart.total + product.price
            const updatedCart = await cart.save().then(newcart => {
                return newcart
            })

            res.status(200).json({"message": "Success!", body: await Cart.findOne({user}).populate({path:'items',strictPopulate:false}).then(cart => cart)});
            return
        }

        const newItem = await new CartItem({
            photo: product.imagePath,
            product: productId,
            productName: product.title,
            description: product.description,
            quantity: 1,
            price:product.price,
            total: product.price,
            cart: cart._id
        }).save().then(item => {
            return item
        })

        cart.quantity += 1
        cart.total = cart.total + product.price
        const updatedCart = await cart.save().then(newcart => {
            return newcart
        })

        res.status(200).json({"message": "Success!", body: await Cart.findOne({user}).populate({path:'items',strictPopulate:false}).then(cart => cart)});
    }
});

router.get('/cart/count/items/:user', auth, async function (req, res, next) {
    const totalItems = await Cart.findOne({user: req.params.user}).then(result => {
        if(result !== null) {
            return result.quantity
        }
        return 0
    })
    res.status(200).json({message: 'Success', body: totalItems});
});

router.get('/settings', async function (req, res, next) {
     Setting.findOne({}).then(result => {
        if(result !== null) {
            res.status(200).json({message: 'Success', body: result});
        }else {
            res.status(404).json({message: 'Not Found', body: {}});
        }
    }).catch(err => {
         res.status(500).json({message: err, body: {}});
     })

});

router.get('/checkout',auth, async function (req, res, next) {

    const {order,contact} = req.body

    const cart = await Cart.findOne({user:order.user,orderCreated:{ $ne: false }}).then(result => {
        return result
    })

    const settings = await Setting.findOne({}).then(result => {
        return result
    })

    const totalItems = cart.quantity
    const totalPrice = cart.total
    const totalTax = totalPrice * (settings.tax / 100)
    const shipping = settings.shipping
    const subTotal = totalPrice + totalTax
    const grandTotal = subTotal + shipping

    const orderItem = await new Order({user:order.user,cart:cart._id,quantity:totalItems,total:totalPrice,tax:totalTax,subTotal,shipping,grandTotal,paid:false}).save().then(order => {
        return order
    })

    const {email, mobile, address,country,city,postalCode,user} = contact

    let customerContact = Contact.findOne({user}).then(result => {
        return result
    })

    if(!customerContact){
        customerContact = await new Contact({email, mobile, address,country,city,postalCode,user}).save().then(result => {
            return result
        })
    }


    Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }


    const invoice = await new Invoice({order:orderItem._id,cart:cart._id,paymentMethod:order.paymentMethod,amount:grandTotal,issueDate:new Date(),dueDate:new Date().addDays(15),paid:false,contact:customerContact._id}).save().then(result => {
        return result;
    })

    if(invoice !== null) {
        res.status(200).json({message: 'Success', body: invoice});
    }else {
        res.status(401).json({message: 'Failed to create new Invoice', body: {}});
    }

});


module.exports = router