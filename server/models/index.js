'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','config','db.json'))[
    env
];
const db = {};


let sequelize = new Sequelize(
  'REACT_BOARD',
  'utsoft',
  'utsoft!@#',
  {
    host:'175.201.10.158',
    dialect : 'mysql',
    port : '3306',

  },
  config,
  {
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  }
);
    
  
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

    db.Teacher = require('./teacher')(sequelize,Sequelize);
    db.Class = require('./class')(sequelize, Sequelize);
    db.TEST = require('./test')(sequelize, Sequelize);
    db.FILE = require('./file')(sequelize, Sequelize);
    db.Board = require('./board')(sequelize,Sequelize);

    //db.Teacher.hasOne(db.Class);

//db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db; 


