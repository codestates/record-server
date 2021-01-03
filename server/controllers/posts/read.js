const {Post, User} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

  getPosts: async(req, res) => {//랜딩페이지에 모든 posts(!복수) 보내주는
    let allPosts = await Post.findAll();
    let resultsPosts = allPosts.map(el => el.dataValues)//! [{post user},{},{},...]

    let allUsers = await User.findAll();
    let resultsUsers = allUsers.map(el => {
      return el.dataValues;
    })

    res.status(200).json({postsData: resultsPosts, usersData: resultsUsers, message: "ok"});//!
  },

  getUserPosts: async(req, res) => {//해당 유저가 작성한 모든 posts(!복수) 보내주는
    if(!req.headers['authorization']) {//url?에 id가 안담겨있을때
      res.status(400).json({data: null, message: "insufficient parameters supplied"})
    }
    let ACCESS_TOKEN = req.headers['authorization'].split(' ')[1];
    let payload = await jwt.verify(ACCESS_TOKEN, process.env.ACCESS_SECRET);
    let foundPosts = await Post.findAll({
      where: {
        userId: payload.id
      }
    })
    if(!foundPosts) {
      res.status(404).json({data: null, message: "not found posts"});
    } else {
      let results = foundPosts.map(el => el.dataValues);//!
      res.status(200).json({postData: results, message: "ok"});//!
    }
  },

  getPost: async(req, res) => {//유저가 작성한 posts중 한개를 보내주는(카드글 클릭시?)
    if(!req.params.id) {
      res.status(400).json({data: null, message:"insufficient parameters supplied"});
    }

    
    let foundPost = await Post.findOne({
      where: {
        id: req.params.id
      }
    });

    let foundUser = await User.findOne({
      where: {
        id: foundPost.userId
      }
    })
    delete foundUser.dataValues.password;

    if(!foundPost) {
      res.status(404).json({data: null, message: "not found post"});
    } else {
      let {id, title, contents, imageUrl, userId, like, createdAt, updatedAt} = foundPost;
      res.status(200).json({
        postData: {
            id, title, contents, imageUrl, userId, like, createdAt, updatedAt
          },
        userInfo: foundUser.dataValues
        ,
        message: "ok"
      })
    }
  }
  
};



// [
//   {
//     dataValues: {
//       id: 1,
//       userId: 'kimcoding',
//       password: '1234',
//       email: 'kimcoding@codestates.com',
//       createdAt: 2020-11-18T10:00:00.000Z,
//       updatedAt: 2020-11-18T10:00:00.000Z
//     },
//     _previousDataValues: {
//       id: 1,
//       userId: 'kimcoding',
//       password: '1234',
//       email: 'kimcoding@codestates.com',
//       createdAt: 2020-11-18T10:00:00.000Z,
//       updatedAt: 2020-11-18T10:00:00.000Z
//     },
//     _changed: Set(0) {},
//     _options: {
//       isNewRecord: false,
//       _schema: null,
//       _schemaDelimiter: '',
//       raw: true,
//       attributes: [Array]
//     },
//     isNewRecord: false
//   }
// ]