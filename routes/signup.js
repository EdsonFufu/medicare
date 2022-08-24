const express = require("express")
const router = express.Router()

router.get("/",(req,res) => {
    res.render("signup",{title:'SignUp',id:req.session.user._id,isLoggedIn:true,data:req.session.user})
})

router.post("/",(req,res) => {
    res.render("users/create",{id:req.session.user._id,isLoggedIn:true,data:req.session.user})
})

module.exports = router