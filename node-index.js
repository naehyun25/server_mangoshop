var http=require('http');//노드모듈 import 해서 변수 http에 저장
var hostname='127.0.0.1';//컴퓨터 내부주소
var port='8080'; //서버포트
//서버생성(요청, 응답)
const server=http.createServer((req,res) => {
    const path = req.url;
    const method = req.method;
    if(path==='/products'){
        if(method==="GET"){//읽기
            res.writeHead(200,{"Content-Type":"application/json"});
            const products=JSON.stringify([{name:"배변패드", price:50000}]); //stringify :JavaScript 값이나 객체를 JSON 문자열로 변환 
            res.end(products)
        }else if(method==="POST"){//생성하기
            res.end("생성되었습니다.")//응답에 메세지를 전달할 수 있음
        }
    }
    res.end("Good Bye");
})
server.listen(port,hostname);
console.log('mangoshop server on');