let memo = [];
function myFunction(){
    //textarea value에 담긴 내용 가져오기
    memo = document.getElementById("add-memo").value;
    if(memo !== ""){
        //<article> tag name을 가진 객체 생성
        let newMemo=document.createElement("article");
        //값 지정
        newMemo.innerHTML = memo;
        //생성된 객체를 section에 추가
        document.querySelector("#myMemo").appendChild(newMemo);

        //aside내의 <article>내의 div 에 element 값 지정
        console.log(document.querySelectorAll("#myMemo"));
        console.log(document.querySelectorAll("#myMemo")[0]);
        let num = document.querySelectorAll("#myMemo")[0].getElementsByTagName("article").length;
        document.querySelector("#memo-num").innerHTML=num.toString();
    }
};
document.getElementById('append-text-button').addEventListener('click',myFunction);