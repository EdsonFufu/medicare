const express = require("express")
const auth = require("../middleware/auth");
const router = express.Router()

router.get("/",auth,(req,res) => {
    res.render("cart/index",{isLoggedIn:false})
})

router.get("/:id",auth,(req,res) => {
    const id = req.params.id
    res.render("cart/view",{isLoggedIn:false})
})

module.exports = router