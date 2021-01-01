const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

router.post('/register', usersController.register.post);
router.post('/logout', usersController.logout.post);//! post는 서버에 영향을 미치는 것(멱등성이 아닌것),get은 멱등성(여러번해도 같은 결과를 갖는 것)
router.post('/login', usersController.login.post);

router.get('/mypage/read', usersController.mypage.get);//
router.put('/mypage/update', usersController.mypage.put);//

router.get('/accessTokenRequest', usersController.accessTokenRequest.get);
router.get('/refreshTokenRequest', usersController.refreshTokenRequest.get);

module.exports = router;