const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

router.post('/register', usersController.register.post);
// router.get('/logout', usersController.logout.post);
// router.get('/auth', usersController.auth.get);
router.post('/login', usersController.login.post);
// router.get('/mypage', usersController.mypage.get);

module.exports = router;