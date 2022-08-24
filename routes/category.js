const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const multer = require("multer")
const helpers = require("helpers")
const Category = require("../model/category")
var path = require("path");
const Product = require("../model/product");
const createError = require("http-errors");
const User = require("../model/user");

// const upload = multer({ dest: "/uploads/" });

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, '/uploads/');
//     },
//
//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'public/uploads/');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};



var upload = multer({storage: storage,filter:imageFilter}).single('image');

router.get('/', auth, function(req, res, next) {
    Category.find(function(err,categories){
        res.render('category/index', { title:'Category', categoryList:categories,exists:categories.length > 0,id:req.session.user._id,isLoggedIn:true,user:req.session.user});
    })
});

router.get("/create",auth,(req,res) => {
    res.render("category/create",{id:req.session.user._id,isLoggedIn:true,user:req.session.user})
})

router.post("/",auth,(req,res,err) => {

    upload(req,res,(err) => {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        console.log(err);
        if (!req.file) {
            return res.render('category/create', {
                message: 'Please select an image to upload',
                id: req.session.user._id,
                isLoggedIn: true,
                user: req.session.user
            });
        } else if (err instanceof multer.MulterError) {
            return res.render('category/create', {
                message: err,
                id: req.session.user._id,
                isLoggedIn: true,
                user: req.session.user
            });
        } else if (err) {
            return res.render('category/create', {
                message: err,
                id: req.session.user._id,
                isLoggedIn: true,
                user: req.session.user
            });
        }

        const name = req.body.name
        const desc = req.body.description
        const imagePath = `/uploads/${req.file.originalname}`;

        const category = Category({
            name, description: desc, imagePath
        })
        console.log(category)


        // Display uploaded image for user validation
        category.save({}).then(category => {
            return res.redirect(`category/${category._id}`)
        }).catch(err => {
            return res.render('category/create', {
                message: 'err',
                id: req.session.user._id,
                isLoggedIn: true,
                user: req.session.user
            });
        })

    });



})

router.get("/:id",auth,(req,res) => {
    const id = req.params.id
    console.log(id)
    Category.findOne({_id:id}).then(category =>{
        console.log(category)
        res.render('category/view', { title:'Category', category:category,exists:category.length > 0,id:req.session.user._id,isLoggedIn:true,user:req.session.user});
    }).catch((err) =>{
        console.log(err)
        res.status(500).send()
    })
})

router.get('/delete/:id',auth, function(req, res, next) {
    const catId = req.params.id
    Category.findByIdAndRemove(catId, (err, docs) => {
        if (err){
            console.log(err)
            res.status(500).render('500',{layout:"layout-plan"})
        }
        else{
            console.log("Removed Item: ", docs);
            res.redirect("/category")
        }
    });
});

module.exports = router