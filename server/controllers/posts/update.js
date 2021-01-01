const {Post} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {//글수정
  put: async(req, res) => {//:id
    
    if(!req.body.title || !req.body.contents || !req.params.id) {                              //Logic:필수값 유효성 검증
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

      let targetPost = await Post.findOne({                                                    //Logic: 작성되지 않은 post 검사
        where: {
          userId: decoded.id,
          id: req.params.id
        }
      })
      
      if(!targetPost) {
        res.status(404).json({data: null, message: "not found post"})
      }

      let {imageUrl, title, contents} = req.body;
      let updatedPost = await Post.update({                                                     //Logic:포스트 수정/업데이트
          userId: decoded.id,
          imageUrl: imageUrl,
          title: title,
          contents: contents
      },{//새로운 포스트 DB생성
          where: {
            id: req.params.id//!
          }
        });

      let {tagNames} = req.body;
      tagNames.map(async(tagName) => {                                                          //Logic:새로운 태그가 들어왔으면 db에생성
        await Tag.findOrCreate({
          where: {tagName: tagName}
        });
      })

      let foundTagIds = tagNames.map(async(tagName) => {                                      //Logic:태그id만 추출한 배열
        let foundTag = await Tag.findOne({
          where: {tagName: tagName}
        });
        return foundTag.id;
      })

      foundTagIds.map(async(tagId) => {                                                    //Logic: join table DB에 없으면 생성
        await Post_Tag.findOrCreate({//수정한것이니까 create가 아님
          where: {
            postId: updatedPost.id,
            tagId: tagId
          }
        });
      })
      let {id, userId, title, contents, imageUrl, created_at, updated_at} = updatedPost.dataValues
      res.status(200).json({ data: {postData: {id, userId, title, contents, imageUrl, created_at, updated_at}}, message: "updated ok" });
    });
    
  }
}
//Post.update 참고 - https://jetalog.net/83