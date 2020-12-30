module.exports = {
  usersController: require('./users'),
  postsController: require('./posts'),
  // commentsController: require('./comments'),
  // tagsController: require('./tags'),
  accessTokenRequest: require('./users/accessTokenRequest'),
  refreshTokenRequest: require('./users/refreshTokenRequest')
};

