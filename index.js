//import React from "react";와 같은개념
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
//포트설정의 기본값을 쓰거나 없으면 8080번 포트를 사용하겠다.
const models = require("./models");/* ./models/index.js */
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },//경로설정
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

//json 형식의 데이터를 처리할수 있게 설정
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//rest API
//method,경로설정(요청,응답)
app.get("/products", (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]],//정렬기능
    attributes: ["id", "name", "price", "seller", "imageUrl", "createdAt", "soldout"],
    //limit:1,//제한을 거는거(1개만 나옴)
    //조회 결과값을 조정할 수 있다. 로딩속도 개선에 좋음
    //'참조컬럼','ASC'(오름차순) || 'DESC' (내림차순) =>안쓰면 id기준 오름차순
  })
  .then((result) => {//모든 데이터는 비동기식
    console.log("product 조회결과:", result);
    res.send({ products: result });
  })
  .catch((err) => {
    console.error(err);
    res.send("에러발생");
  });
});

//api 요청 -> 전달 -> 응답
app.post("/purchase/:id", (req, res) => {
  const {id} =req.params;//한번에 표기
  models.Product.update({
    soldout:1,
  },{
    where:{id},
  }
  )
  .then((result) => {
    res.send({
      result:true,
    });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("에러발생");
  });
});


app.get("/products/:id", (req, res) => {
  const params = req.params;
  //const id=params.id;
  //const { id, eventId } = params;
  const { id } = params;
  models.Product.findOne({
    where: { id: id },
  })
    .then((result) => {
      console.log("조회결과 :", result);
      res.send({
        product:result
      })
    })
    .catch((error) => {
      console.log("에러 :", error);
    }); 
});
  
//get은 데이터를 못보냄 받아뿌리기만함

app.post('/image', upload.single('image'),(req,res) => {
    const file = req.file;
    console.log(file);
    res.send({
        imageUrl:file.path,
    })
})
app.get("/banners",(req,res)=>{
  models.Banner.findAll({
    limit:2,
  })
  .then((result) => {
    res.send({
      banners:result
    })
  })
  .catch((err) => {
    console.error(error);
    //반환코드 지정
    res.status(500).send("에러발생");
  })

})


//상품생성데이터를 데이터베이스에 추가
app.post("/products", (req, res) => {
  const body = req.body;
  //submit으로 보낸 데이터를 req(요청).body로 받고 그걸 상수 body에 담음
  //1. 디스트럭처링으로 상수 body 의 값을 개별적으로 할당한다
  const { name, description, price, seller, imageUrl } = body;
  if (!name || !description || !price || !seller) {
    res.send("모든 필드를 입력해주세요");
  }
  //2. 레코드 생성 (행단위): Product테이블에 괄호안의 객체를 생성함
  models.Product.create({ 
    name, 
    description, 
    price, 
    seller,
    imageUrl
  })
   //3. 데이터를 다루는 것은 기본적으로 비동기 통신을 지원하므로 promise 객체 활용
   .then((result) => {
    console.log("상품생성결과:", result);
    res.send({ result });
  })
  .catch((error) => {
    console.error(error);
    res.send("상품 업로드에 문제가 발생했습니다.");
  });
//res.send({ body });
});
app.post("/login", (req, res) => {
  res.send("로그인이 완료 되었습니다.");
});

//app 실행
app.listen(port, () => {
  console.log("망고샵의 쇼핑몰 서버가 돌아가고 있습니다. 으르렁왈왈왈🐶🐶");
  models.sequelize
    .sync()
    .then(() => {
      console.log("😀db연결 성공");
    })
    .catch((err) => {
      console.err(err);
      console.log("😫db연결 실패");
      process.exit();
    });

  //method: post, /login 로그인이 완료되었습니다
app.post("/login", (req, res) => {
  res.send("로그인이 완료되었습니다");
});

  /* sync() 접속 
    sequelize.sync() db에 필요한 테이블 생성
    process.exit() 서버종료하는 명령어
   */
});

/* sqlite =>mysql을 쉽게 다루게 경량화함
    ORM => sqlite를 더 쉽게 사용함
*/

/* 
  npx sequelize init 을 하면 아래 폴더들이 생성 된다.
├── ...
├── config  //sequelize와 연결될 데이터베이스 설정
│   └── config.json 
├── models  //데이터베이스 모델링 관련 설정
│   └── index.js
├── seeders
└── migrations

*/

