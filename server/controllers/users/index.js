module.exports = {
  register : require('./register'),
  logout : require('./logout'),
  auth : require('./auth'),
  login : require('./login'),
  mypage : require('./mypage')
};

// router.post('/register', usersController.register.registerPost);
// router.get('/logout', usersController.logout.logoutGet);
// router.get('/auth', usersController.auth.authGet);
// router.post('/login', usersController.login.loginPost);
// router.get('/mypage', usersController.mypage.mypageGet);