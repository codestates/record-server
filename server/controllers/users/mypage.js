const {User} = require('../../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  
  get: async(req, res) => {//mypage에 data 보내주는 콘트롤러
    if(!req.headers['authorization']) {//url?에 id가 안담겨있을때
      res.status(400).json({data: null, message: "insufficient parameters supplied"})
    }

    let ACCESS_TOKEN = req.headers['authorization'].split(' ')[1];
    let payload = await jwt.verify(ACCESS_TOKEN, process.env.ACCESS_SECRET);

    let foundUser = await User.findOne({
      where: {
        id: payload.id
      }
    })
    if(!foundUser) {
      res.status(404).json({data: null, message: "not found user"});
    } else {
      // console.log('--------->>>>>>>>',foundUser);
      let {id, username, email, profileUrl, githubUrl, introduce, nickname, createdAt, updatedAt} = foundUser;
      res.status(200).json({
        data: {
          userInfo: {
            id, username, email, profileUrl, githubUrl, introduce, nickname, createdAt, updatedAt
          }
        },
        message: "ok"
      })
    }


  },
  put: async(req, res) => {//마이페이지 수정할때

    if(!req.headers['authorization']) {//url?에 id가 안담겨있을때
      res.status(400).json({data: null, message: "insufficient parameters supplied"})
    }

    let ACCESS_TOKEN = req.headers['authorization'].split(' ')[1];
    let payload = await jwt.verify(ACCESS_TOKEN, process.env.ACCESS_SECRET);

    let {username, profileUrl, githubUrl, introduce, nickname, createdAt, updatedAt, password} = req.body;

    await User.update(
      {username, profileUrl, githubUrl, introduce, nickname, createdAt, updatedAt, password},
      {
        where: {
        id: payload.id
        }
      }
    )

    let updatedUser = await User.findOne( {
      where: {
        id: payload.id
      }
    })

    if(!updatedUser) {
      res.status(401).json({data: null, message: "not authorized"});
    } else {
      let {id, username, email, profileUrl, githubUrl, introduce, nickname, createdAt, updatedAt} = updatedUser;
      res.status(200).json({
        userInfo: {
            id, username, email, profileUrl, githubUrl, introduce, nickname, createdAt, updatedAt
          },
        message: "ok"
      })
    }

  }
}