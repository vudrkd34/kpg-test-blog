
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'test', // 테이블의 이름을 지정합니다.
      {
       num : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
       },
       test_col: {
        type: DataTypes.STRING(50),
        allowNull : true
       },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        tableName:'test'
        
      }
  )};