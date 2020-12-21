const Movie = require('../models/movie');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //mongodb내에 저장된 모든 영화의 목록을 배열 형태로 반환
  //반환된 영화 목록을 활용하여 유행영화 목록 생성
  // 영화 목록 및 유행 영화목록을 랜더링 하기 위한 local variable로 활용하여 index.pug rendering
  Movie.find({}).then((movie)=>{
    let movieList = movie;
    Movie.find({trending:true}).then((trendMovie)=>{
      let trendMovieList = trendMovie;
      res.render('index',{
        movieList : movieList,
        trendMovieList : trendMovieList,
      });
    }).catch((err)=>{
      console.log(err);
    });
  }).catch((err)=>{
    console.log(err);
  });




});

router.get('/newmovie',function(req,res,next){
  //새로운 영화 등록을 위한 템플릿 렌더링
  res.render('newmovie');
});


router.get('/admin',function(req,res,next){
  Movie.find({}).then((movie)=>{
    let movieList=movie;
    //console.log(movieList);
    res.render('admin',{
      movieList : movieList,
    });
  }).catch((err)=>{
    console.log(err);
  });



});

module.exports = router;
