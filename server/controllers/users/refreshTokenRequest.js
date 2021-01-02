const {User} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
  get: async(req, res) => {
    if(!req.headers.cookie) {
      res.status(400).json({data: null, message: "invalid refresh token"})
    }
    let REFRESH_TOKEN = req.headers.cookie.split('=')[1];
    // console.log('----->>>>>',REFRESH_TOKEN);
    // let REFRESH_TOKEN = req.cookies.refreshToken;->x //! https는 cookies도 있지만, http는 노출이 되므로 req.cookies가 없는것같다.
    
    let refreshTokenData = await jwt.verify(REFRESH_TOKEN, process.env.REFRESH_SECRET);
    if(!refreshTokenData) {//accessTokenRequest에서는 이 if문이 없지만 reference코드의 refreshTokenRequest에서는 있어서 여기도 놔둠
      res.status(401).json({//토큰조차 없을 때 401
        data: null,
        message: "invalid refresh token please login again"
      });
    }
    let userInfo = await User.findOne({
      where: {
        id: refreshTokenData.id
      }
    });
    if(!userInfo) {
      res.status(403).json({//토큰은 있지만 가짜일때 403
        data: null,
        message: "refresh token has been tempered"
      })
    } else {
      let {id, email, username, profileUrl, nickname} = userInfo;
      let newAccessToken = jwt.sign({id, email, username, profileUrl, nickname}, process.env.ACCESS_SECRET, {expiresIn:'24h'});
      res.status(200).json({
        data:{
          accessToken: newAccessToken,
          userInfo: {id, email, username, profileUrl, nickname},
        },
        message: "ok"
      })
    }
  }
}