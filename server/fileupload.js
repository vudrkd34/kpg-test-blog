const multer = require('multer');
const moment = require('moment');

console.log('reach file')

const storage = multer.diskStorage({

  destination: function(req, file, cb) {
    cb(null, './public/uploads');  // 파일이 저장되는 경로입니다.
  },
  filename: function(req, file, cb) {  //MuYaho~
    cb(null, moment().format('YYYYMMDDHHmmss') + "_" + file.originalname);  // 저장되는 파일명
  }
});

const upload = multer({ storage: storage }).array("files");   // single : 하나의 파일업로드 할때 array : 다중 파일 업로드



module.exports = upload;


