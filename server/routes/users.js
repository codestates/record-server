const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

router.post('/register', usersController.register.post);
router.post('/logout', usersController.logout.post);//! post는 서버에 영향을 미치는 것(멱등성이 아닌것),get은 멱등성(여러번해도 같은 결과를 갖는 것)
// router.get('/auth', usersController.auth.get);
router.post('/login', usersController.login.post);//!
// router.get('/mypage', usersController.mypage.get);

module.exports = router;