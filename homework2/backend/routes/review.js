var express = require('express');
var router = express.Router();
const Review= require('../models/review');


/* GET home page. */
router.get('/', function(req, res, next) {
    Review.find({}).then((review)=>{
        res.status(200).json({
            'review' : review,
        });
    }).catch((err)=>{
        console.log(err);
    });

});


router.post('/',function(req,res,next){
    console.log(req.body);
    // const review = new Review({
    //     movie_name:req.body.movie_name,
    //     review_content : req.body.review_content,
    //     rate: req.body.rate,
    // });
    const review = new Review(req.body);

    review.save((err)=>{
        console.log(err);
    });
    res.status(200).json({
        'result' : "good",
    });
})

router.get('/:id',function(req,res,next){
    const {id} = req.params;
    Review.deleteOne({_id : id}).then((result)=>{
        res.status(200).json({
            result : result,
        });
    });
})

module.exports = router;
