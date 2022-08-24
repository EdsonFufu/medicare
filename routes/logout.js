const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jwt-then");
const User = require("../model/user")

router.get('/', function(req, res){
    req.session.destroy(()=>{
        console.log("User logged out.")
    });
    res.redirect('/login');
});

module.exports = router