//영화 정보 편집 페이지 이동
function gotoEdit(link){
    //get요청하는 form 구상 후 form submit
    console.log(link.value);
    const form = document.createElement('form');
    form.method = 'get';
    form.action = "/routes/movie/read/"+link.value;
    document.body.appendChild(form);
    form.submit();
}

//삭제 요청 함수
// function gotoDelete(link){
//     const form = document.createElement('form');
//     form.method = 'post';
//     form.action = "/routes/movie/delete/"+link.value;
//     document.body.appendChild(form);
//     form.submit();
// }

function ajaxDelete(id){
    var xhr = new XMLHttpRequest();

    xhr.onload = function(){
        if(xhr.status === 200 || xhr.status === 201){
            let deletedMovie = document.getElementById("movie"+id);
            deletedMovie.remove();
            //alert("삭제 성공!");

        }else {
            //alert("삭제 실패");
            console.log("삭제 실패");
        }
    }
    // xhr.onreadystatechange= function(){
    //     if(xhr.status === 200 || xhr.status === 201){
    //         let deletedMovie = document.getElementById("movie"+id);
    //         deletedMovie.remove();
    //         //alert("삭제 성공!");
    //
    //     }else {
    //         //alert("삭제 실패");
    //         console.log("삭제 실패");
    //     }
    //}

    xhr.open("POST", "/routes/movie/delete/"+id);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send();
}

//인기 영화 지정/비지정  함수
function gotoTrend(link){
    const form = document.createElement('form');
    form.method = 'post';
    form.action = "/routes/movie/update/"+link.name;
    const hiddenField = document.createElement('input');
    hiddenField.type='hidden';
    hiddenField.name = 'trending';
    hiddenField.value = 'true';
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
}


function gotoNonTrend(link){
    const form = document.createElement('form');
    form.method = 'post';
    form.action = "/routes/movie/update/"+link.name;
    const hiddenField = document.createElement('input');
    hiddenField.type='hidden';
    hiddenField.name = 'trending';
    hiddenField.value = 'false';
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
}