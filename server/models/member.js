
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'member_info', // 테이블의 이름을 지정합니다.
      {
       num : {
        allowNull: false,
        autoIncrement: true,  
        primaryKey: true,
        type: DataTypes.INTEGER
       },
       mb_id: {
        type: DataTypes.STRING(50),
        allowNull : true 
        
       },
       mb_pw: {
        type: DataTypes.STRING(200),
        allowNull : true
       },
       name: {
        type: DataTypes.STRING(200),
        allowNull : true
       },
       email: {
        type: DataTypes.STRING(200),
        allowNull : true
       },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        tableName:'member_info'
        
      }
  )};