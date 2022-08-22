const express = require("express")
const User = require("../model/user");
const router = express.Router()
const auth = require("../middleware/auth")

/* GET Users List. */
router.get('/', auth, function(req, res, next) {
    User.find(function(err,users){
        res.render('users/index', { title:'Users', userList:users,usersExists:users.length > 0});
    })
});

/* GET User Create. */
router.get('/create',auth, function(req, res, next) {
    res.render('users/create', { title:'Create User'});
});

/* GET User By ID. */
router.get('/user/view/:id',auth, function(req, res, next) {
    var id = req.params.id
    var user = User.find({'_id':id},(err,result) => {
        res.render('users/view', { title:`User#${id}`, user:result,userExists:result.length > 0});
    });
});

/* GET User Create. */
router.post('/',auth, function(req, res, next) {
    res.render('users/create', { title:'Create User'});
});

module.exports = router