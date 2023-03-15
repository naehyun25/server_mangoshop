//express, cors 모듈 import
const express = require("express");
const cors = require("cors");

const app=express();//주인공
const port = 8080;

const models=require("./models");

//json 형식의 데이터를 처리할 수 있게 설정(아래 두줄은 환경설정한거임)
app.use(express.json());
app.use(cors());//cors를 app이 쓰겠다.

//경로설정부분
    //상품조회
app.get('/products',(req,res) => {
    //findAll 함수
    models.Product.findAll()
    .then((result) => {
        console.log("product조회결과:",result);
        res.send({product:result});
    })
    .catch((err) => {
        console.error(err);
        res.send("에러발생");
    }) 
})
    //상품등록(업로드)=>데이터베이스추가
app.post('/products',(req,res) => {
    const body = req.body
    //1. 상수 body에 전달받은 값을 구조분해 할당
    const {name, price,seller,description, imageUrl}=body;
            //추가=> 방어코드 
            //(아니면 뒤로가기 누르면 이전에 작성했던게 남아있게하거나)
    if(!name || !description || !price || !seller){
        res.send("모든 필드를 입력해주세요")
      }


    //2. 레코드생성 : 레코드는 행단위의 데이터(기준은 열이었음위에거)
    //models 는 우리가 임포트해서 만든 상수(맨위에)
    models.Product.create({name, price,seller,description, imageUrl})
    //3.
    .then((result) => {
        console.log("상품생성결과:",result);
        res.send({result})
    })
    .catch((error) => {
        console.error(error)
        res.send("상품업로드에 문제가 발생했습니다.")
    });
    
})
app.get('/products/:id/events/:eventId',(req,res) => {
    const params = req.params;
    //const id = params.id;
    const {id,eventId}=params;
        res.send(`id는 ${id}입니다 evenId는 ${eventId}`)
})
//method:post, /login 로그인이 완료되었습니다.
app.post('/login',(req,res)=>{
    res.send("로그인이 완료되었습니다.")
})

//app 실행 부분(이 위는 경로 설정)
app.listen(port,() => {
    console.log("망고샵의 쇼핑몰 서버가 돌아가고 있습니다.왈왈")
    models.sequelize
    .sync()
    .then(() => {console.log('🎆db연결성공');})
    .catch((err) => {
        console.error(err); 
        console.log('🔊db연결에러'); 
        process.exit(/* 에러시 서버종료 하겠다는 명령어 */);});
    //sequelize.sync(->접속하겠다) :sequelize 초기화시 연결되면 테이블을 생성해준다.
})