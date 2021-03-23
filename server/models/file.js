
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'teacher', // 테이블의 이름을 지정합니다.
      {
        num : {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        board_num: {
            type: DataTypes.INTEGER,
            allowNull : true
        },
        file_nm: {
            type: DataTypes.STRING(50),
            allowNull : true
        },
        file_location: {
            type: DataTypes.STRING(50),
            allowNull : true
        },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        tableName:'test_file'
      }
  )};