module.exports=( sequelize,DataTypes) => {
    // sequelize를 사용해서 테이블을 정의한다(define)
    const product = sequelize.define("Product",{ // Product = table 이름
        name:{
            type:DataTypes.STRING(5),
            allowNull:false   
        },
        price:{
            type:DataTypes.INTEGER(10),
            allowNull:false
        },
        seller:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        description:{
            type:DataTypes.STRING(300),
            allowNull:false
        },
        imageUrl:{
            type:DataTypes.STRING(100),
            allowNull:true //allowNull default:true
        },
        soldout:{
            type:DataTypes.INTEGER(1),
            allowNull:true,
            defaultValue:0,
            //sqlite는 sql의 모든 언어를 지원하지 않기때문에 boolean 자료형도 지원하지않는다.  그래서 숫자로 구현하기로 한다.

        }
    })

    return product
}
// 지금 사용하고 있는 데이터베이스는 id 값을 자동부여해서 쓸 필요없음