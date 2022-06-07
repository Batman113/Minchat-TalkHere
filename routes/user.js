const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/userController');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/post',userController.post);
router.get('/signIn',userController.logIn);
router.get('/signUp',userController.signUp);
router.post('/create',userController.create);
router.post('/update/:id',userController.update);
//using passport as middleware to authenticate
router.post('/loginSession',passport.authenticate(
    'local',
    {failureRedirect : '/user/signIn'},
),userController.loginSession);
router.get('/signOut',userController.logOut);
router.get('/auth/google',passport.authenticate(
    'google',
    {scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signIn'}),userController.loginSession);
module.exports = router;