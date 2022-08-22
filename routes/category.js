const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

router.get("/",auth,(req,res) => {
    res.render("category/index",{isLoggedIn:true})
})

router.get("/:id",auth,(req,res) => {
    const id = req.params.id
    res.render("category/view",{isLoggedIn:true})
})

module.exports = router