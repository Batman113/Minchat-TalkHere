const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
router.get('/profile',userController.profile);
router.get('/post',userController.post);
module.exports = router;