const express = require("express")
const router = express.Router()

router.get("/login",(req,res) => {
    res.render("login",{ layout:"layout-plain",title:'Login',isLoggedIn:false})
})

router.post("/login",(req,res) => {
    res.render("users/create",{isLoggedIn:false})
})

module.exports = router