var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/shopping';

router.use('/insert', function(req, res, next) {
    var products = [
        {
            imgPath:'/images/GBA_Crash_Bandicoot_-_The_Huge_Adventure_Box.jpg',
            title:'Crash Bandicoot',
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui architecto nulla rerum reiciendis blanditiis nemo, natus iste libero voluptatibus quidem id culpa nam excepturi veritatis sunt corporis esse iure sed.',
            price: '12.99'
        },
        {
            imgPath:'/images/GBA_Donkey_Kong_Country_Box.jpg',
            title:'Donkey Kong',
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui architecto nulla rerum reiciendis blanditiis nemo, natus iste libero voluptatibus quidem id culpa nam excepturi veritatis sunt corporis esse iure sed.',
            price: '8.99'
        },
        {
            imgPath:'/images/GBA_Pokemon_Fire_Red_Box.jpg',
            title:'Pokemon Fire Red',
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui architecto nulla rerum reiciendis blanditiis nemo, natus iste libero voluptatibus quidem id culpa nam excepturi veritatis sunt corporis esse iure sed.',
            price: '10.99'
        },
        {
            imgPath:'/images/GBA_Super_Mario_Advance_Box.jpg',
            title:'Super Mario Advance',
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui architecto nulla rerum reiciendis blanditiis nemo, natus iste libero voluptatibus quidem id culpa nam excepturi veritatis sunt corporis esse iure sed.',
            price: '13.99'
        },
        {
            imgPath:'/images/gba_yoshis_island_super_mario_adv_3_p_4bzzqq.jpg',
            title:'Yoshis island',
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui architecto nulla rerum reiciendis blanditiis nemo, natus iste libero voluptatibus quidem id culpa nam excepturi veritatis sunt corporis esse iure sed.',
            price: '9.99'
        },
        {
            imgPath:'/images/GBA_Pokemon_Sapphire_Box.jpg',
            title:'Pokemon Sapphire',
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui architecto nulla rerum reiciendis blanditiis nemo, natus iste libero voluptatibus quidem id culpa nam excepturi veritatis sunt corporis esse iure sed.',
            price: '10.99'
        }

    ];
    mongo.connect(url, function(err,db) {
        assert.equal(null, err);
        for (var i=0;i<products.length;i++){
            db.collection('productData').insertOne(products[i])
            
            console.log('Item inserted');
            if (i === (products.length -1)) {
                db.close();
            }
    
}

});
res.redirect('/');
res.end();
});


module.exports = router;

