var express = require('express');
var router = express.Router();


var userController = require('../controller/use.controller.js');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user/list', userController.userList);

module.exports = router;


// formdata 读取不到数据解决方法
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
// router.post('/register', multipartMiddleware, userController.register);