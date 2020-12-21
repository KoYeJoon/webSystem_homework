var express = require('express');
var router = express.Router();
const fs = require('fs');
const { promisify } = require('util');
var path = require('path');
var public_folder = path.resolve('./public');
var movies = [];

router.post('/', function(req, res, next) {
    const statAsync = promisify(fs.stat);
    var img_path = path.join(public_folder,req.body.movie_img_url);
    statAsync(img_path).then((stats)=>{
        next();
    }).catch((error)=>{
        //res.render('error',{message : "http 연결 불가능"});
        //res.json({message : "이미지 경로 없음, http 요청 불가능"});
        //res.end();
        console.log("이미지 경로 없음, http 요청 불가능");
        res.redirect('/');
    });

},function(req,res,next){
    var body = req.body;
    var movie_img_url = body.movie_img_url;
    var movie_title = body.movie_title;
    var movie_casting = body.movie_casting;
    var movie_genre = body.movie_genre;
    var movie_rating = body.movie_rating;
    var movieObj = {title : movie_title,
        casting : movie_casting,
        genre : movie_genre,
        rating : movie_rating,
        imgURL : movie_img_url
    };
    movies.push(movieObj);
    res.render('result',{
        movie_img_url : movie_img_url,
        movie_title : movie_title,
        movie_casting : movie_casting,
        movie_genre : movie_genre,
        movie_rating : movie_rating
    });
});


module.exports = router;