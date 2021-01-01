const {User} = require('../../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  
  get: async(req, res) => {//mypage에 data 보내주는 콘트롤러
    if(!req.headers['authorization']) {//url?에 id가 안담겨있을때
      res.status(400).json({data: null, message: "insufficient parameters supplied"})
    }

    let ACCESS_TOKEN = token.split(' ')[1];
    let payload = await jwt.verify(ACCESS_TOKEN, process.env.ACCESS_SECRET);

    let foundUser = await User.findOne({
      where: {
        id: payload.id
      }
    })
    if(!foundUser) {
      res.status(404).json({data: null, message: "not found user"});
    } else {
      let {id, username, email, profileUrl, githubUrl, introduce, nickname, created_at, updated_at} = foundUser;
      res.status(200).json({
        data: {
          userInfo: {
            id, username, email, profileUrl, githubUrl, introduce, nickname, created_at, updated_at
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

    let ACCESS_TOKEN = token.split(' ')[1];
    let payload = await jwt.verify(ACCESS_TOKEN, process.env.ACCESS_SECRET);

    let {username, profileUrl, githubUrl, introduce, nickname} = req.body;

    let updatedUser = await User.update(
      {username, profileUrl, githubUrl, introduce, nickname},
      {
        where: {
        id: payload.id
        }
      }
    )
    if(!updatedUser) {
      res.status(401).json({data: null, message: "not authorized"});
    } else {
      let {id, username, email, profileUrl, githubUrl, introduce, nickname, created_at, updated_at} = updatedUser;
      res.status(200).json({
        data: {
          userInfo: {
            id, username, email, profileUrl, githubUrl, introduce, nickname, created_at, updated_at
          }
        },
        message: "ok"
      })
    }

  }
}