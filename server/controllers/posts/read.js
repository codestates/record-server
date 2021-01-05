const {Post, User} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

  // {
  //   "title": "버퍼 테스트",
  //   "contents": "테스트",
  //   "imageUrl": {"type":"Buffer","data":[100,97,116,97,58,14,79,8,113,97,65,43,57,55,89,69,88,51,66,101,70,86,112,121,112,121,121,121,80,81,104]}
  // }

  getPosts: async(req, res) => {//랜딩페이지에 모든 posts(!복수) 보내주는
    
    let allPosts = await Post.findAll();
    let resultPosts = allPosts.map(el => el.dataValues)//! [{post user},{},{},...]


    let allUsers = await User.findAll();
    let resultUsers = allUsers.map(el => {
      return el.dataValues;
    });

    let results = [];
    resultPosts.forEach(post => {
      resultUsers.forEach(user => {
        if(post.userId === user.id) {
          results.push({...post, user})
        }
      })
    })

    res.status(200).json({results: results, postsData: resultPosts, usersData: resultUsers, message: "ok"});//!
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

// 아래 코드는 서버에서 buffer를 base64로 변환해서 보내주는 코드 -> too large에러
// getPosts: async(req, res) => {//랜딩페이지에 모든 posts(!복수) 보내주는
    
//   let allPosts = await Post.findAll();
//   let beforeConvertedPosts = allPosts.map(el => el.dataValues)//! [{post user},{},{},...]

//   let convertedPosts = beforeConvertedPosts.map(el => {
//     let imageUrl = Buffer.from(el.imageUrl).toString('base64');
//     // delete el.imageUrl
//     return {...el, imageUrl};
//   })


//   let allUsers = await User.findAll();
//   let beforeConvertedUsers = allUsers.map(el => {
//     return el.dataValues;
//   });
//   let convertedUsers = beforeConvertedUsers.map(el => {
//     let profileUrl = Buffer.from(el.profileUrl).toString('base64');//!toString이 인코딩기능이있구나
//     // delete el.profileUrl
//     return {...el, profileUrl};
//   })

//   let results = convertedPosts.forEach(post => {
//     convertedUsers.forEach(user => {
//       if(post.userId === user.id) {
//         return {...post, user}
//       }
//     })
//   })

//   res.status(200).json({results: results, postsData: convertedPosts, usersData: convertedUsers, message: "ok"});//!
// }