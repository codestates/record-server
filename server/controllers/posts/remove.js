const {Post} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {//글삭제

  delete: async(req, res) => {//:id
    if(!req.params.id) {                                                                        //Logic:필수값 유효성 검증
      res.status(400).json({ data: null, message: "insufficient parameters supplied" });
    }
    if(!req.headers['authorization']) {                                                         //Logic:토큰 유무 검증
      res.status(403).json({ data: null, message: "invalid access token" });
    }
    let accessToken = req.headers['authorization'].split(' ')[1];
    jwt.verify(accessToken, process.env.ACCESS_SECRET, async(err, decoded) => {                 //Logic:토큰 일치 검사
      if(err) {
        res.status(401).json({ data: null, message: "not authorized" });
      }
      //--------------여기부터
      let targetPost = await Post.findOne({
        where: {
          userId: decoded.id,
          id: req.params.id
        }
      })
      if(!targetPost) {
        res.status(404).json({data: null, message: "not found post"})
      }
      await Post.destroy({
        where: {
          userId: decoded.id,
          id: req.params.id
        }
      });
      res.status(200).json({ data: null, message: "removed ok" });
    });
  }

};