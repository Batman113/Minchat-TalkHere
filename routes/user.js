const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/userController');
router.get('/profile',userController.profile);
router.get('/post',userController.post);
router.get('/signIn',userController.logIn);
router.get('/signUp',userController.signUp);
router.post('/create',userController.create);
//using passport as middleware to authenticate
router.post('/loginSession',passport.authenticate(
    'local',
    {failureRedirect : '/user/signIn'},
),userController.loginSession);
module.exports = router;