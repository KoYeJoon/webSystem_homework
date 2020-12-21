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

    });
    movie.save((err)=>{
        //데이터 저장 성공 시
        res.redirect('/');
    });

});

router.get('/read/:id',function(req,res,next){
    console.log(req.params.id);
    Movie.findById(req.params.id).then((movie)=>{
        res.render('editmovie',{movie:movie});
    }).catch((err)=>{
        console.log(err);
    })
})

router.post('/update/:id',function(req,res,next){
    console.log(req.body);

    Movie.findByIdAndUpdate(req.params.id,req.body,(err,movie) => {
        res.redirect("http://localhost:3000/admin");
    })
})


router.post('/delete/:id',function(req,res,next){
    Movie.deleteOne({_id : req.params.id}).then((result)=>{
        var response = {
            success : true
        }
        res.status(200).json(response);
    }).catch((err)=>{
        var response = {
            success : false
        }
        res.status(500).json(response);
    });

    // Movie.deleteOne({_id : req.params.id}).then((result)=>{
    //     res.redirect("http://localhost:3000/admin");
    // }).catch((err)=>{
    //     console.log("삭제실패");
    // });
})
module.exports = router;
