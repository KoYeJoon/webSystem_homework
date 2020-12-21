const Movie = require('../models/movie');
var express = require('express');
var router = express.Router();


router.post('/create', function(req, res, next) {
    // 클라이언트가 전송한 영화 정보를 mongodb에 저장
    // 서버에 저장되는 영화 정보의 데이터 구조 {_id,title,year,url,trending}
    const movie = new Movie({
        title : req.body.title,
        year : req.body.year,
        url : req.body.url,
        //trending : req.body.trending,
    });
    movie.save((err)=>{
        //데이터 저장 성공 시
        res.redirect('/');
    });

});


module.exports = router;
