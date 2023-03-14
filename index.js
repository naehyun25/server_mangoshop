//express, cors 모듈 import
const express = require("express");
const cors = require("cors");

const app=express();//주인공
const port = 8080;

//json 형식의 데이터를 처리할 수 있게 설정(아래 두줄은 환경설정한거임)
app.use(express.json());
app.use(cors());//cors를 app이 쓰겠다.

//경로설정부분
app.get('/products',(req,res) => {
    const query = req.query
    console.log(query)

    res.send({
        "products":[
                {
                    "id":1,
                    "name": "안녕!!",        
                    "price": "50000",        
                    "seller": "내추럴코어",        
                    "imageUrl": "images/products/food1.jpg",
                    "imgalt":"상품사료사진",
                    "selleralt": "판매자사진"     
                },
                {
                    "id":2,
                    "name": "하네스",        
                    "price": 30000,        
                    "seller": "도기멍",        
                    "imageUrl": "images/products/acc1.jpg",
                    "imgalt":"상품기저기사진",
                    "selleralt": "판매자사진"    
                },
                {
                    "id":3,
                    "name": "배변패드",        
                    "price": "5000",        
                    "seller": "흡수혁명",        
                    "imageUrl": "images/products/house1.jpg",
                    "imgalt":"상품배펀패드사진",
                    "selleralt": "판매자사진"   
                },
                {
                    "id":4,
                    "name": "비싼거",        
                    "price": "50000",        
                    "seller": "먹자",        
                    "imageUrl": "images/products/food2.jpg",
                    "imgalt":"상품사료사진",
                    "selleralt": "판매자사진"   
                },
                {
                    "id":5,
                    "name": "중간거",        
                    "price": "15000",        
                    "seller": "먹자",        
                    "imageUrl": "images/products/food3.jpg",
                    "imgalt":"상품사료사진",
                    "selleralt": "판매자사진"     
                },
                {
                    "id":6,
                    "name": "집집",        
                    "price": "50000",        
                    "seller": "집언제삼",        
                    "imageUrl": "images/products/house2.jpg",
                    "imgalt":"상품집사진",
                    "selleralt": "판매자사진"     
                },
                {
                    "id":7,
                    "name": "장난감",        
                    "price": "10000",        
                    "seller": "미쳤다",        
                    "imageUrl": "images/products/toy2.jpg",
                    "imgalt":"상품장난감사진",
                    "selleralt": "판매자사진"     
                }
        ]
    })
})
app.post('/products',(req,res) => {
    const body = req.body
    console.log(body);
    res.send({body})
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

//app 실행 부분
app.listen(port,() => {
    console.log("망고샵의 쇼핑몰 서버가 돌아가고 있습니다.왈왈")
})