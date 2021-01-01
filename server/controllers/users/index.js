
module.exports = {
  register : require('./register'),
  logout : require('./logout'),
  login : require('./login'),
  mypage : require('./mypage'),//
  accessTokenRequest: require('./accessTokenRequest'),
  refreshTokenRequest: require('./refreshTokenRequest')
};

// router.post('/register', usersController.register.registerPost);
// router.get('/logout', usersController.logout.logoutGet);
// router.get('/auth', usersController.auth.authGet);
// router.post('/login', usersController.login.loginPost);
// router.get('/mypage', usersController.mypage.mypageGet);