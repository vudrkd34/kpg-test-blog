const express = require('express');
const app = express();
const router = require('./route'); 

const PORT = process.env.PORT || 4000;
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/' , router);


const {
    Teacher,
    TEST,
    Sequelize:{Op}

} = require('./models');
sequelize.query('SET NAMES utf8;');

//등록 
app.post('/add/data', (req, res) => {
    console.log(" REQUEST_BODY +++++++  : " +req.body.data)

    TEST.create({
        test_col : req.body.data
    })
    .then( result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err)
        throw err;
    })
})



//데이터가져오기
app.get('/get/data',(req,res) => {
    TEST.findAll({
    where : { /*[Op.or] : [{ num : 1}, { test_col : '테스트다2' }] */ }
    })
    .then( result => {res.send(result)})
    .catch(err => {throw err})
})



//수정
app.post('/modify/data', (req,res) => {

    TEST.update({ test_col : req.body.modify.test_col }, {
        where : { num : req.body.modify.num}
    })
    .then( result => {res.send(result) })
    .catch( err => {throw err })
})

//삭제
app.post('/delete/data', (req,res) => {
    TEST.destroy({
        where : { num : req.body.delete.num}
    })
    .then(res.sendStatus(200))
    .catch(err => {throw err})
})


app.listen(PORT, () => {
    
    console.log(`Server On : http://localhost:${PORT}/`);
}) 