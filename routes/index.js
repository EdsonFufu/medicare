var express = require('express');
var router = express.Router();
var Product = require('../model/product')
var User = require('../model/user')



/* GET Login Page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title:'Login'});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,products){
    let productChunks = [];
    let chunkSize = 4;
    for(let i = 0; i < products.length; i += chunkSize){
      productChunks.push(products.slice(i,i + chunkSize));
    }
    res.render('shop/index', { title:'Products', productList:productChunks,productsExists:productChunks.length > 0});
  })
});

/* GET Products List. */
router.get('/product', function(req, res, next) {
  Product.find(function(err,products){
    res.render('products/index', { title:'Products', productList:products,productsExists:products.length > 0});
  })
  
});

/* GET Product By ID. */
router.get('/product/view/:id', function(req, res, next) {
  var id = req.params.id
  var product = Product.find({'_id':id},(err,result) => {
    res.render('products/view', { title:`Product#${id}`, product:result,productsExists:result.length > 0});
  });
  
});

/* GET Users List. */
router.get('/user', function(req, res, next) {
  User.find(function(err,users){
    res.render('users/index', { title:'Users', userList:users,usersExists:users.length > 0});
  })
});

/* GET User Create. */
router.get('/user/create', function(req, res, next) {
    res.render('users/create', { title:'Create User'});
});

/* GET User By ID. */
router.get('/user/view/:id', function(req, res, next) {
  var id = req.params.id
  var user = User.find({'_id':id},(err,result) => {
    res.render('users/view', { title:`User#${id}`, user:result,userExists:result.length > 0});
  });
  
  
});


/* GET Payment List. */
router.get('/payment', function(req, res, next) {
  User.find(function(err,users){
    res.render('users/index', { title:'Users', userList:users,usersExists:users.length > 0});
  })
  
});


/* GET Orders List. */
router.get('/order', function(req, res, next) {
  User.find(function(err,users){
    res.render('users/index', { title:'Users', userList:users,usersExists:users.length > 0});
  })
  
});

/* GET Cart List. */
router.get('/cart', function(req, res, next) {
  User.find(function(err,users){
    res.render('users/index', { title:'Users', userList:users,usersExists:users.length > 0});
  })
  
});

module.exports = router;
