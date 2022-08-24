const express = require("express")
const auth = require("../middleware/auth");
const User = require("../model/user");
const router = express.Router()

/* GET Orders List. */
router.get('/order', auth, function(req, res, next) {
    User.find(function(err,users){
        res.render('users/index', { title:'Users', userList:users,usersExists:users.length > 0,id:req.session.user._id,isLoggedIn:true,data:req.session.user});
    })

});

router.get("/:id",auth,(req,res) => {
    const id = req.params.id
    res.render("order/view",{id:req.session.user._id,isLoggedIn:true,data:req.session.user})
})

module.exports = router