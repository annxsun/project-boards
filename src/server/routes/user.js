var express = require('express');
var router = express.Router();
var userController = require('../controller/use.controller.js');

router.post('/login', userController.login);

module.exports = router;