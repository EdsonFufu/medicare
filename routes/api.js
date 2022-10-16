const express = require("express")
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jwt-then");
const router = express.Router()

router.post("/login",(req,res) => {
    console.log("Credentials",req.body)
    if (!req.body.username || !req.body.password) {
        res.statusCode = 401
        res.send({message: "Invalid Request Data",body:{}});
    } else {
        const {username, password} = req.body;
        User.findOne({'email':username}).select({'fullname':1,'password':1,'userRole':1,'isActive':1,'createdAt':1,'updatedAt':1}).limit(1).then(async usr => {
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

        User.findOne({'email':req.body.email}).select({'fullname':1,'password':1,'userRole':1,'isActive':1,'createdAt':1,'updatedAt':1}).then(usr => {
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
            res.status(400).render("400", {"message": "Sign Up Failed"})
        })
    }
});

module.exports = router