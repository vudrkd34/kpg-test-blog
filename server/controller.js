
// AWS DB 이용할때만
//const path = require('path');
// const AWS = require('aws-sdk');

// AWS.config.loadFromPath(
//     path.join(__dirname, 'config','awsConfig.json')
// );

const model = require('./model');

module.exports = {
    needs: () => upload,
    api : {
        getData : (req,res) => {
            model.api.getData(data => {
                return res.send(data)
            })
        },
        addData : (req,res) => {
            //console.log("===================== req :" + req.body.data )
            model.api.addData (req,data => {
                return res.send(data)
            })
        },
        modifyData : (req,res) => {
            model.api.modifyData (req,data => {
                return res.send(data)
            })
        },
        deleteData : (req,res) => {
            model.api.deleteData (req,data => {
                return res.sendStatus(200)
            })
        },
    } 
}