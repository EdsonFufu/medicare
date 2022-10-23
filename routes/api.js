const express = require("express")
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jwt-then");
const auth = require("../middleware/auth-api");
const Category = require("../model/category");
const Product = require("../model/product");

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
                res.status(200).json({message:"Login Successful",body:{token,user:usr}});
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
                res.status(200).json({message: "Login Successful", body: {token, user: usr}});
            });

        }).catch(err => {
            console.error(err);
            res.status(400).json( {"message": "Sign Up Failed",body:{}})
        })
    }
});

router.get('/category', auth, function(req, res, next) {
    Category.find({}).populate({path:'products',strictPopulate:false}).then( results => {
        let categories = []
        results.forEach(result => {
            console.log(result._id)
            Product.find({category:result._id}).then(products => {
                console.log("Product:",products)
                result.products = products
            })

            categories.push(result)
        })

        res.status(200).json({ message:'Success', body:categories});
    }).catch(err => {
        console.error(err);
        res.status(500).json( {message: "Failed to get categories",body:{}})
    })
});

router.get('/category/:id', auth, function(req, res, next) {
    Category.findOne({_id:req.params.id}).populate({path:'products',strictPopulate:false}).then( result => {

        res.status(200).json({ message:'Success', body:result});
    }).catch(err => {
        console.error(err);
        res.status(500).json( {message: "Failed to get category",body:{}})
    })
});

router.get('/product', auth, function(req, res, next) {
    Product.find({}).populate({path:'category',strictPopulate:false}).populate({path:'photos',strictPopulate:false}).then( result => {
        console.log("Photos:",result.photos)
        res.status(200).json({ message:'Success', body:result});
    }).catch(err => {
        console.error(err);
        res.status(500).json( {message: "Failed to get products",body:{}})
    })
});

router.get('/product/:id', auth, function(req, res, next) {
    Product.findOne({_id:req.params.id}).populate({path:'category',strictPopulate:false}).populate({path:'photos',strictPopulate:false}).then( result => {
        res.status(200).json({ message:'Success', body:result});
    }).catch(err => {
        console.error(err);
        res.status(500).json( {message: "Failed to get product",body:{}})
    })
});

router.get('/profile/:id', auth, function(req, res, next) {
    User.findOne({_id:req.params.id}).populate({path:'cart',strictPopulate:false}).then( result => {
        res.status(200).json({ message:'Success', body:result});
    }).catch(err => {
        console.error(err);
        res.status(500).json( {message: "Failed to get User Profile",body:{}})
    })
});

module.exports = router