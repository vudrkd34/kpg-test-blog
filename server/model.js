const sequelize = require('./models').sequelize;

const {
    Teacher,
    TEST,
    Sequelize:{Op}

} = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    api : {
        getData : callback => {
            TEST.findAll({
                where : { /*[Op.or] : [{ num : 1}, { test_col : '테스트다2' }] */ }
                })
                .then( result => {callback(result)})
                .catch(err => {throw err})
        },
        addData : (req,callback) => {
                console.log("================= req : "+ req.body.data)
            TEST.create({
                
                test_col : req.body.data
                })
                .then( result => {callback(result)})
                .catch(err => {throw err})
        },
        modifyData : (req,callback) =>{

            TEST.update({ test_col : req.body.modify.test_col }, {
                where : { num : req.body.modify.num}
            })
            .then( result => {callback(result) })
            .catch( err => {throw err })

        },
        deleteData : (req,callback) => {

            TEST.destroy({
                where : { num : req.body.delete.num}
            })
            .then(callback)
            .catch(err => {throw err})

        }

    }
}