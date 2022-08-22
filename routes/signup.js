const express = require("express")
const router = express.Router()

router.get("/",(req,res) => {
    res.render("signup",{ layout:"layout-plain",title:'SignUp',isLoggedIn:false})
})

router.post("/",(req,res) => {
    res.render("users/create",{isLoggedIn:false})
})

module.exports = router