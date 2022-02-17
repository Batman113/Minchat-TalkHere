const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
router.get('/profile',userController.profile);
router.get('/post',userController.post);
router.get('/signIn',userController.logIn);
router.get('/signUp',userController.signUp);
module.exports = router;