const express = require('express');
const router  = express.Router();
const controller = require('./controller');

router.get('/get/data', controller.api.getData);
router.post('/add/data', controller.api.addData);
router.post('/modify/data',controller.api.modifyData);
router.post('/delete/data',controller.api.deleteData);
router.post('/get/info',controller.api.getInfo);
router.post('/get/file',controller.api.getFile);
router.post('/delete/file',controller.api.deleteFile);
router.post('/login',controller.api.doLogin);



module.exports = router;
