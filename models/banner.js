module.exports=(sequelize, Datatype) =>{
    const banner = sequelize.define("Banner", {
        imageUrl:{
            type:Datatype.STRING(300),
            allowNull:false,
        },
        href:{
            type:Datatype.STRING(200),
            allowNull:false,
        },
    })
    return banner;
}