const express = require("express")
const auth = require("../middleware/auth");
const Product = require("../model/product");
const Category = require("../model/category");
const Photo = require("../model/photo")
const multer = require("multer")
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'public/uploads/products');
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



var upload = multer({storage: storage,filter:imageFilter}).array('photos',10);



/* GET Products List. */
router.get('/', auth, function(req, res, next) {
    Product.find(function(err,products){
        //console.log("Products",products)
        res.render('products/index', { title:'Products', productList:products,productsExists:products.length > 0,id:req.session.user._id,isLoggedIn:true,user:req.session.user});
    })
});

router.get("/create",auth,(req,res)=>{

     Category.find({}, function (err, categories) {
        if (err){
            console.log("Failed to retrieve categories",err);
        }
        else{
            console.log("Categories : ", categories);
        }
         res.render('products/create', { title:`Create Product`,id:req.session.user._id,isLoggedIn:true,user:req.session.user,categories});
     });

})

router.post("/",auth,(req,res,err) => {

    upload(req, res, (err) => {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        if(err) {
            console.log(err);
        }
        console.log("Files",req.files)
       if  (err instanceof multer.MulterError) {
            return res.render('products/create', {
                message: err,
                id: req.session.user._id,
                isLoggedIn: true,
                user: req.session.user
            });
        } else if (err) {
            return res.render('products/create', {
                message: err,
                id: req.session.user._id,
                isLoggedIn: true,
                user: req.session.user
            });
        }
        else if (!req.files) {
            return res.render('products/create', {
                message: 'Please select images to upload',
                id: req.session.user._id,
                isLoggedIn: true,
                user: req.session.user
            });
        }

        console.log("Upload Successful")

        const product =new Product({
            title: req.body.title,
            description: req.body.description,
            category:req.body.category,
            information: req.body.information,
            imagePath: `/uploads/products/${req.files[0].originalname}`,
            available: req.body.available,
            price: req.body.price,
            discount:"0"
        })
        console.log("Product",product)


        // Display uploaded image for user validation
        product.save({}).then(product => {
            let photos = [];

            req.files.forEach(file => {
                console.log("OriginalFileName",file.originalname)
                photos.push(new Photo({
                    imagePath:`/uploads/products/${file.originalname}`,
                    name: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size,
                    productId:product
                }));
            })

            console.log("Photos",photos)

            Photo.insertMany(photos, (err, docs) => {
                console.log("Uploaded Photos",docs)
            })

            return res.redirect(`product/${product._id}`)

        }).catch(err => {
            console.log("Error During Uploading Photos",err)
            return res.render('products/create', {
                message: 'err',
                id: req.session.user._id,
                isLoggedIn: true,
                user: req.session.user
            });
        })

    });
});

/* GET Product By ID. */
router.get('/:id',auth, function(req, res, next) {
    const id = req.params.id

    Product.findOne({'_id':id}).populate("category").then(async result => {
        let photos = []
        await Photo.find({productId: id}).then(images => {
            images.forEach(img => {
                photos.push({path: img.imagePath, name: img.name})
            })
        })
        console.log("Photos", photos)
        res.render('products/view', {
            title: `Product#${id}`,
            product: result,
            productExists: true,
            id: req.session.user._id,
            isLoggedIn: true,
            user: req.session.user,
            photos
        });
    }).catch(e => {
        throw e;
    });
});

module.exports = router