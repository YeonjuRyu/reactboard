const fetch = require("node-fetch");
var express =  require('express');
var app = express();

/* 1번 기능
version
endpoint: 27.1.60.24:9900/test
method: get* (read)
input param: none
output param: version
*/
function version(){
    let url = 'http://27.1.60.24:9900/test';
    fetch(url, {
        method: 'GET' //url에서 get해오기
    })
    .then((response) => response.json()) //받은 값을 json으로 바꾸고
    .then((jsonObj) => console.log(jsonObj)) //json값을 출력시킴
    .catch(err => console.log(err)); //에러 발생시 메세지 출력
}

/*2번 기능
id, password 등록
endpoint: 27.1.60.24:9900/auth/register
method: post* (write)
input param: {id, pw}
output param: {result, error}
*/
function register(userid, userpw){
    fetch('http://27.1.60.24:9900/auth/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userid, 
            pw: userpw})
        })
        .then((response) => response.json()) //받은 값을 json으로 바꾸고
        .then((jsonObj) => {console.log(jsonObj) //json값을 출력시킴
            if(jsonObj.result == "ok") { //성공적으로 결과가 성공적이라면 (성공적으로 서버에 데이터 전달)
                app.get('/', function(req, res) {
                    res.send('main'); //메인페이지로 이동
                    });
            } else if(jsonObj.result == "fail") { //에러 발생시 메세지 출력
                alert('error! reason is:' + jsonObj.error)}
        })
}
      
/*3번 기능
endpoint: 27.1.60.24:9900/auth/login
method: get* (read)
input param: {id, pw}
output param: {result, error}
*/
function login(userid, userpw){
    fetch('http://27.1.60.24:9900/auth/login', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userid, 
            pw: userpw})
        })
        .then((response) => response.json())
        .then((jsonObj) => {console.log(jsonObj)
            if(jsonObj.result == "ok") {
                app.get('/', function(req, res) {
                    res.send('main'); //express 라우터 사용하여 메인페이지로 이동
                  });
            } else if(jsonObj.result == "fail") {
                alert('error! reason is:' + jsonObj.error)
            }
        })
}
/*4번 기능
endpoint: 27.1.60.24:9900/auth/update
method: post* (update)
input param: {id, pw, newPw}
output param: {result, error}
*/
function changepw(userid, userpw, usernewPw){
    fetch('http://27.1.60.24:9900/auth/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify({
             id: userid, 
             pw: userpw,
             newPw: usernewPw})
            })
            .then((response) => response.json())
            .then((jsonObj) => {console.log(jsonObj)
                if(jsonObj.result == "ok") {
                    app.get('/', function(req, res) {
                        res.send('main'); //express 라우터 사용하여 메인페이지로 이동
                      });
                } else if(jsonObj.result == "fail") {
                    alert('error! reason is:' + jsonObj.error);}
            })
}
/*5번 기능
endpoint: 27.1.60.24:9900/board/boardList
method: get* (read)
input param: none
output param: {result, boardList, error}
*/
function boardlist(){
    var rtValue='';
    fetch('http://27.1.60.24:9900/board/boardList', {
        method: 'GET'})
        .then((response) => response.json())
        .then((jsonObj) => {console.log(jsonObj)
            if(jsonObj.result == "ok") {
                console.log(jsonObj.boardList[0].board_name)
               rtValue = jsonObj.boardList[0].board_name; // 게시판 목록 페이지로 이동
            } else if(jsonObj.result == "fail") {
                alert('error! reason is:' + jsonObj.error)
            }
        })
    return rtValue;
}
/*6번 기능
endpoint: 27.1.60.24:9900/board/postList/:board의 id 값(ex: 27.1.60.24:9900/board/postList/1)
method: get* (read)
input param: boardid
output param: {result, postList, error}
*/
function postlist(boardid){
    let url = 'http://27.1.60.24:9900/board/postList/'+String(boardid);
    fetch(url, {
        method: 'GET'})
        .then((response) => response.json())
        .then((jsonObj) => {console.log(jsonObj)
            if(jsonObj.result == "ok") {
                'postList출력'
            } else if(jsonObj.result == "fail") {
                alert('error! reason is:' + jsonObj.error)
            }
        })
}
/*7번 기능
endpoint: 27.1.60.24:9900/board/post/:post의 id(ex: 27.1.60.24:9900/board/post/1)
method: get* (read)
input param: postid
output param: {result, postDetail, error}
*/
function viewpost(postid){
    let url = 'http://27.1.60.24:9900/board/post/'+String(postid);
    fetch(url, {
        method: 'GET'})
        .then((response) => response.json())
        .then((jsonObj) => {console.log(jsonObj)
            if(jsonObj.result == "ok") {
                'post Detail출력'
            } else if(jsonObj.result == "fail") {
                alert('error! reason is:' + jsonObj.error)
            }
        })
}