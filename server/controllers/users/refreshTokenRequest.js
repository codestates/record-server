const {User} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = async(req, res) => {
  let REFRESH_TOKEN = req.cookies.refreshToken;
  if(!REFRESH_TOKEN) {
    res.status(400).json({
      data: null,
      message: "refresh token not provided"
    })
  }
  let refreshTokenData = await jwt.verify(REFRESH_TOKEN, process.env.REFRESH_SECRET);
  if(!refreshTokenData) {
    res.status(400).json({
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
    res.status(400).json({
      data: null,
      message: "refresh token has been tempered"
    })
  } else {
    let {id, email, username, profileImg} = userInfo;
    let newAccessToken = jwt.sign({id, email, username, profileImg}, process.env.ACCESS_SECRET, {expiresIn:'2h'});
    res.status(200).json({
      data:{
        accessToken: newAccessToken,
        userInfo: {id, email, username, profileImg}
      },
      message: "ok"
    })
  }
}