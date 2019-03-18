const userController = require('../controllers/userController')
const express = require('express');
const router = express.Router();


router.post('/login',userController.validate('login'),userController.login);
router.post('/createUser',userController.validate('createUser'),userController.createUser);

module.exports = router