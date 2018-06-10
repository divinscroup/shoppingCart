var express = require('express');
var router = express.Router();
var product = require('../routes/product');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopping');
var assert = require('assert');
var csrf = require('csurf');
var objectId = require('mongodb').ObjectID;
var passport  = require('passport');
var cookieParser = require('cookie-parser');
var csrfProtection = csrf({cookie: true});
var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended: false });

var Schema = mongoose.Schema;
var userDataSchema = new Schema({
  imgPath:{type: String, required: true},
  title: String,
  description: String,
  price: Number
}, {collection: 'productData'});
var UserData = mongoose.model('UserData', userDataSchema);

var cartSchema = new Schema({
  id_cart: String
},{collection:'cartData'});
var cartData = mongoose.model('cartData', cartSchema);

require('../config/passport');

router.get('/', function(req, res, next) {
  UserData.find()
  .then(function(resultArray) {
    cartData.find()
    .then(function(cartArr){
      res.render('index', {title: 'Shopping Cart',items: resultArray, arrCart: cartArr.length});
    });
  });
});
router.use(function(req,res,next){
  res.locals.login = true;
  next();
});

router.use(product);

router.get('/users/profile' , function(req,res,next){
  res.render('users/profile');
});

router.get('/users/logout',notLoggedIn, function(req,res,next){
  req.logout();
  res.redirect('/');
  
});

router.get('/users/signup',csrfProtection, function(req,res,next){
  var messages = req.flash('error')
  res.render('users/signup', {csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0});
});
router.post('/users/signup', parseForm, csrfProtection,passport.authenticate('local.signup',{
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true
  
}));

router.get('/users/signin',csrfProtection, function(req,res,next){
  var messages = req.flash('error')
  res.render('users/signin', {csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0});

});

router.post('/users/signin', parseForm, csrfProtection,passport.authenticate('local.signin',{
  successRedirect: 'profile',
  failureRedirect: 'signin',
  failureFlash: true,
  
}));

router.get('/add-to-cart/:_id', function(req,res,next){
var productId = {id_cart:req.params._id};
var data = new cartData(productId);
  data.save();
    
    console.log(productId);
    res.redirect('/');
  });
  

  
module.exports = router;

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  
  res.redirect('/');
};
function notLoggedIn(req,res,next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};
