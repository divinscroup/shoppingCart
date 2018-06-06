var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/shopping';
var fs = require("fs");
router.use('/insert', function(req, res, next) {
    var contents = fs.readFileSync("product.json");
// Define to JSON type
    var jsonContent = JSON.parse(contents);
    
    mongo.connect(url, function(err,db) {
        assert.equal(null, err);
        for (var i=0;i<jsonContent.length;i++){
            db.collection('productData').insertOne(jsonContent[i])
            
            console.log('data inserted !');
            if (i === (products.length -1)) {
                db.close();
            }
    
}

});
res.redirect('/');
res.end();
});


module.exports = router;

