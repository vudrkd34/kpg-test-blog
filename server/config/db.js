const mysql = require('mysql');

const db = mysql.createPool({
    host: '175.201.10.158',
    port: '3306',
    user: 'utsoft',
    password: 'utsoft!@#',
    database: 'REACT_BOARD'
});

module.exports = db;