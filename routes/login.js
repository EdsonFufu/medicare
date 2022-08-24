const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jwt-then");
const User = require("../model/user")

router.get("/",(req,res) => {
    res.render("login",{ layout:"layout-plain",title:'Login',isLoggedIn:false})
})

router.post("/",(req,res) => {
    console.log("Credentials",req.body)
    if (!req.body.username || !req.body.password) {
        res.render('login', {message: "Please enter both username and password"});
    } else {
        const {username, password} = req.body;
        User.findOne({username}).then(async usr => {
            const isMatch = await bcrypt.compare(password, usr.password);
            if (!isMatch){
                res.render('login', {message: "Incorrect username or password"});
                return
            }

            const payload = {
                user: {
                    id: usr.id
                }
            };

            await jwt.sign(
                payload,
                process.env.SECRET,
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    console.log("Token Generated",token)
                   // res.status(200).header("Authorization", "Bearer " + token).json({});
                }
            );

            req.session.user = usr;
            res.redirect('/');

        }).catch(err => {
            res.status(401);
            res.render("/login",{message: "Login Failed"})
        })

    }
})

module.exports = router