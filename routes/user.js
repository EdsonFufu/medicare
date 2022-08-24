const express = require("express")
const User = require("../model/user");
const router = express.Router()
const auth = require("../middleware/auth")
const bcrypt = require("bcrypt");
const jwt = require("jwt-then")

/* GET Users List. */
router.get('/', auth, function(req, res, next) {
    User.find(function(err,users){
        res.render('users/index', { title:'Users', userList:users,usersExists:users.length > 0,id:req.session.user._id,isLoggedIn:true,data:req.session.user});
    })
});

/* GET User Create. */
router.get('/create',auth, function(req, res, next) {
    res.render('signup', { title:'Create User',layout:'layout',id:req.session.user._id,isLoggedIn:true,data:req.session.user});
});

router.post('/', async function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status("400").render("signup", {"message": "Invalid details!"});
    } else {

        User.find({}, {"username": req.body.username}).then(usr => {
            console.log("Fetched user", usr)
            if (usr.username === req.body.username) {
                res.render('signup', {
                    message: "User Already Exists! Login or choose another user id"
                });
            }
        }).catch(err => {
            console.error(err);
            res.render("signup", {"message": "Sign Up Failed"})
        })
        const salt = await bcrypt.genSalt(10)
        var newUser = new User({
            imagePath:"/images/account.png",
            fullname: req.body.firstName + " " + req.body.lastName,
            email: req.body.username,
            password: await bcrypt.hash(req.body.password, salt),
            userRole: req.body.role,
            isActive: req.body.status
        });

        newUser.save().then(user => {
            const payload = {
                user: {
                    id: user._id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                token => {
                    res.status(200).header("Authorization","Bearer " + token).json({});
                }
            );
            //req.session.user = newUser;

            res.redirect('/user');

        }).catch(err => {
            console.error(err);
            res.status(500).render("500", {"message": "Sign Up Failed"})
        })
    }
});

/* GET User By ID. */
router.get('/:id',auth, function(req, res, next) {
    var id = req.params.id
    var user = User.find({'_id':id},(err,result) => {
        res.render('users/view', { title:`User#${id}`, user:result,userExists:result.length > 0,id:req.session.user._id,isLoggedIn:true,data:req.session.user});
    });
});

/* GET User By ID. */
router.get('/delete/:id',auth, function(req, res, next) {
    const userId = req.params.id
    User.findByIdAndRemove(userId, (err, docs) => {
        if (err){
            console.log(err)
            res.status(500).render('500',{layout:"layout-plan"})
        }
        else{
            console.log("Removed Item: ", docs);
            res.redirect("/user")
        }
    });
});

module.exports = router