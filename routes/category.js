const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

router.get("/",auth,(req,res) => {
    res.render("category/index",{id:req.session.user._id,isLoggedIn:true,data:req.session.user})
})

router.get("/:id",auth,(req,res) => {
    const id = req.params.id
    res.render("category/view",{id:req.session.user._id,isLoggedIn:true,data:req.session.user})
})

module.exports = router