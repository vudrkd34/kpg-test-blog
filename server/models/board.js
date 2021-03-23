
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'board', // 테이블의 이름을 지정합니다.
      {
       num : {
        allowNull: false,
        autoIncrement: true,  
        primaryKey: true,
        type: DataTypes.INTEGER
       },
       title: {
        type: DataTypes.STRING(45),
        allowNull : true 
        
       },
       author: {
        type: DataTypes.STRING(45),
        allowNull : true
       },
       content: {
        type: DataTypes.STRING(1000),
        allowNull : true
       },
       insert_dt: {
        type: DataTypes.DATE,
        allowNull : true
       },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        tableName:'board'
        
      }
  )};