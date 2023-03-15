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
        }
    })

    return product
}
// 지금 사용하고 있는 데이터베이스는 id 값을 자동부여해서 쓸 필요없음