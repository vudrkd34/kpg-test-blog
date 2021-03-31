
// AWS DB 이용할때만
//const path = require('path');
// const AWS = require('aws-sdk');

// AWS.config.loadFromPath(
//     path.join(__dirname, 'config','awsConfig.json')
// );

const upload = require('./fileupload');
const multer = require('multer');
const model = require('./model');
const e = require('express');

let board_num = 0;
let success = 1;

module.exports = {
    needs: () => upload,
    api : {
        getData : (req,res) => {
            model.api.getData(data => {
                return res.send(data)
            })
        },
        addData : (req,res,next) => {

            //파일 첨부도 있어서 upload 함수에 multer require 시켜서 동작 Dataform 자동 body 처리
            upload(req, res, function(err) {

                if (err instanceof multer.MulterError) {
                  return next(err);
                } else if (err) {
                  return next(err);
                }

                console.log(req.files)

                if(req.body.num === ''){
                    //INSERT

                    //데이터 INSERT
                    model.api.addData (req,data => {

                        console.log("addData 안에") //4
                        
                        //INSERT 후 파일처리
                        model.api.addFile(req,data)
                        

                    })

                }else{
                    //UPDATE

                    //데이터 UPDATE
                    model.api.updateData (req,data => {

                        console.log("UPDATE 처리2222222") //4
                        //props.data.setState({num : req.body.num});
                        console.log(data)
                        
                        //UPDATE 후 파일처리
                        model.api.addFile(req,data)
                        

                    })


                    success = 2;

                    
                }
                

                //console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
                return res.json({success:success}); 
            });
            


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
        getInfo : (req,res) => {
            console.log('num : ' + req.body.num)
            model.api.getInfo (req,data => {
                return res.send(data)
            })
        },
        getFile : (req,res) => {
        
            model.api.getFile (req,data => {
                return res.send(data)
            })
        },
        deleteFile : (req,res) => {

            console.log(req.body.num)
            
            model.api.deleteFile (req,data => {
                return res.sendStatus(200)
            })
        },
        doLogin : (req,res) => {


            model.api.selectLoginInfo(req,data => {
                let result = "";
                if(data != null){
                    if(data.mb_pw === req.body.pw){

                        let userInfo ={mb_id :  data.mb_id, name : data.name , email : data.email}

                        result = "SUCCESS||"+JSON.stringify(userInfo)
                    }else{
                        result = "FAIL||비밀번호가 일치하지않습니다."
                    }

                }else{
                    //해당 아이디가 없는경우
                    result = "FAIL||아이디가 존재 하지 않습니다."
                }

                return res.send(result)
            })

            console.log(req.body.id)

        },
        
    } 
}