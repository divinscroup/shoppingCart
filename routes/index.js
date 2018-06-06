var express = require('express');
var router = express.Router();
var product = require('../routes/product');
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/shopping';
var assert = require('assert');
var csrf = require('csurf');
var csurfProtect = csrf();

// router.use(csurfProtect);
router.get('/', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('productData').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    });
      
    res.render('index', {title: 'Shopping Cart', items: resultArray});
    db.close();
    
  });
});


router.use(product);



router.get('/users/signup',csurfProtect, function(req,res,next){
  res.render('users/signup', {csrfToken: req.csrfToken()});
});
router.post('/users/signup', function(req,res,next){
  res.redirect('/');
});

module.exports = router;
