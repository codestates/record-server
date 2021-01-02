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

    let {email, password} = req.body;
    if(!email || !password) {//유효성 검사
      res.status(422).json({data: null, message: "insufficient parameters supplied"})
    }
    
    let userInfo = await User.findOne({
      where: {
        email:req.body.email, 
        password:req.body.password
      }
    });
    
    if(!userInfo) {
      res.status(401).json({
        data: null,
        message: "not authorized"
      })
    } else {
      let {id, username, email, profileUrl, nickname} = userInfo;
      let ACCESS_TOKEN = jwt.sign({id, username, email, profileUrl, nickname}, process.env.ACCESS_SECRET, {expiresIn: '12h'});
      let REFRESH_TOKEN = jwt.sign({id, username, email, profileUrl, nickname}, process.env.REFRESH_SECRET);

      res.cookie('refreshToken', REFRESH_TOKEN,
        // {
        //   httpOnly: true,
        //   secure: false,
        //   sameSite: false
        // }//! http에서는 이 option이 필요없는 것 같다.
      );
      res.status(200).json({data: {accessToken: ACCESS_TOKEN}, message: "successfully token issued!"})
    }

  }
}
// {
//   "email": "sdfsafd@sdaf.com",
//   "password": "1234"
// }

// {
//   "email": "dgfcvbdfgfg@sdaf.com",
//   "username": "codestates",
//   "password": "123",
//   "passwordCheck": "123"
// }

// {
//   "tagNames": ["안농","하세요"],
//   "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAADNCAMAAAAsYgRbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABJQTFRF3NSmzMewPxIG//ncJEJsldTou1jHgAAAARBJREFUeNrs2EEKgCAQBVDLuv+V20dENbMY831wKz4Y/VHb/5RGQ0NDQ0NDQ0NDQ0NDQ0NDQ 0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PzMWtyaGhoaGhoaGhoaGhoaGhoxtb0QGhoaGhoaGhoaGhoaGhoaMbRLEvv50VTQ9OTQ5OpyZ01GpM2g0bfmDQaL7S+ofFC6xv3ZpxJiywakzbvd9r3RWPS9I2+MWk0+kbf0Hih9Y17U0nTHibrDDQ0NDQ0NDQ0NDQ0NDQ0NTXbRSL/AK72o6GhoaGhoRlL8951vwsNDQ0NDQ1NDc0WyHtDTEhDQ0NDQ0NTS5MdGhoaGhoaGhoaGhoaGhoaGhoaGhoaGposzSHAAErMwwQ2HwRQAAAAAElFTkSuQmCC",
//   "contents": "질문을 잘하려면????????????",
//   "title": "질문을 잘하려면????????????"
// }