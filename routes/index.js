const express = require('express');

const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/',homeController.home);
router.get('/profile',homeController.profile);

module.exports = router;