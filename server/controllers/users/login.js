const {User} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  post: async(req, res) => {
    //req에서 토큰 split해서 변수 등록
    //그 토큰으로 유효성 검사(findOne)하고
    //if(유효하지않으면)
    //else(유효하면)
    //쿠키에 refreshToken보내고
    //바디에 accessToken보내기
    // console.log('-------->>>>>>',req);
    let userInfo = await User.findOne({
      where: {
        email:req.body.email, 
        password:req.body.password
      }
    });
    
    if(!userInfo) {
      res.status(400).json({
        data: null,
        message: "not authorized"
      })
    } else {
      let {id, username, email, profileImg} = userInfo;
      let ACCESS_TOKEN = jwt.sign({id, username, email, profileImg}, process.env.ACCESS_SECRET, {expiresIn: '1h'});
      let REFRESH_TOKEN = jwt.sign({id, username, email, profileImg}, process.env.REFRESH_SECRET);

      res.cookie('refreshToken', REFRESH_TOKEN,
        {
          httpOnly: true,
          secure: false,
          sameSite: false
        }
      );
      res.status(200).json({data: {accessToken: ACCESS_TOKEN}, message: "successfully token issued!"})
    }

  }
}