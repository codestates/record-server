const {User} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
  get: async(req, res) => {
    //req.headers에서 split을 사용해서 토큰을 빼서
    //얘를 jwt.verify를 통해 parse해서 변수에 담아서 토큰을 추출
    //얘를 가지고 findOne을 해서 DB조회하고
    //if(유효하지않으면) data:null message:"access token has been tempered"
    //else(유효하면)  data: userInfo message:"ok"
    // console.log('------->>>>>>>>',req.headers);
    let token = req.headers['authorization'];
    if(!token) {//! 위에서 split을 하면 null을 split하는 것이기때문에 에러가 뜸
      res.status(400).json({
        data: null,
        message: "invalid access token"
      })
    }
    let ACCESS_TOKEN = token.split(' ')[1];
    let payload = await jwt.verify(ACCESS_TOKEN, process.env.ACCESS_SECRET);
    let userInfo = await User.findOne({
      where: {
        id: payload.id
      }
    })
    if(!userInfo) {
      res.status(401).json({
        data:null,
        message:"access token has been tempered"
      })
    } else {
      let {id, username, email, profileUrl, nickname} = userInfo;
        res.status(200).json({
          data: {
            userInfo: {id, username, email, profileUrl, nickname}
          }, 
          message: "ok"
        });
    }
  }
}