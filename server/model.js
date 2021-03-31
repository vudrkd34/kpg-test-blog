const sequelize = require('./models').sequelize;

const {
    Teacher,
    TEST,
    FILE,
    Board,
    Member,
    Sequelize:{Op}

} = require('./models');
sequelize.query('SET NAMES utf8;');


module.exports = {
    api : {
        getData : callback => {
            //데이터 GET
            Board.findAll({
                where : { /*[Op.or] : [{ num : 1}, { test_col : '테스트다2' }] */ }
                })
                //데이터 가져와서 다시 리스트에 가져오기 위해 callback 처리
                .then( result => {callback(result)})
                .catch(err => {throw err})
        },
        addData : (req,callback) => {
        
            
            console.log('제목 : ' + req.body.title) //2
            console.log('저자 : ' + req.body.author)
            console.log('내용 : ' + req.body.content)
            
                //데이터 INSERT
                Board.create({
                    title : req.body.title,
                    author : req.body.author,
                    content : req.body.content,
                    insert_dt : sequelize.fn('NOW'),
                })
                //파일 첨부 있을경우위해 INSERT 데이터 반환
                .then( result => {callback(result)})
                .catch(err => {throw err})
        }, 
        updateData : (req,callback) => {
        
            
            console.log('제목 : ' + req.body.title) //2
            console.log('저자 : ' + req.body.author)
            console.log('내용 : ' + req.body.content)

            const data = { num : req.body.num }
            
                //데이터 UPDATE
                Board.update({
                    title : req.body.title,
                    author : req.body.author,
                    content : req.body.content,
                },{where:{ num : req.body.num}})
                //파일 첨부 있을경우위해  데이터 반환
                .then( result => {callback(data)})
                .catch(err => {throw err})
        }, 
        addFile : (req,data) =>{

            console.log('파일 넣으러 옴 ^^7  ')
            console.log('board_num : ' + data.num)
            
            //파일 개수에 따른 처리(없으면 처리 X)
            for (let i = 0 ; i < req.files.length ; i++) {

            const file_path = req.files[i].path.replace('public','');

            //파일 INSERT
            FILE.create({
                
                board_num : data.num,
                file_nm : req.files[i].originalname,
                file_location : file_path,
                
                })
                .then( result => {})
            .catch(err => {throw err})
            }

        },
        modifyData : (req,callback) =>{

            Board.update({ test_col : req.body.modify.test_col }, {
                where : { num : req.body.modify.num}
            })
            .then( result => {callback(result) })
            .catch( err => {throw err })

        },
        deleteData : (req,callback) => {

            Board.destroy({
                where : { num : req.body.delete.num}
            })
            .then(callback)
            .catch(err => {throw err})

        },
        getInfo : (req,callback) => {

            Board.findOne({
            where : { [Op.or] : [{ num : req.body.num}] }
            })
            //데이터 가져와서 다시 리스트에 가져오기 위해 callback 처리
            .then( result => {callback(result)})
            .catch(err => {throw err})

        },
        getFile : (req,callback) => {

            FILE.findAll({
            where : { [Op.or] : [{ board_num : req.body.num}] }
            })
            //데이터 가져와서 다시 리스트에 가져오기 위해 callback 처리
            .then( result => {callback(result)})
            .catch(err => {throw err})

        },
        deleteFile : (req,callback) => {

            FILE.destroy({
                where : { num : req.body.num}
            })
            .then(callback)
            .catch(err => {throw err})

        },
        selectLoginInfo : (req,callback) => {

            Member.findOne({
                where : { mb_id : req.body.id}
            })
            .then(callback)
            .catch(err => {throw err})

        },
        

    }
}