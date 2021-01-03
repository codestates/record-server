const {Post, Post_Tag, Tag} = require('../../models');
const jwt = require('jsonwebtoken');
const update = require('../comments/update');
const {Op} = require('sequelize');
require('dotenv').config();

module.exports = {//글수정

  put: async(req, res) => {//:id

    // console.log('------>>>>>>>', typeof req.params.id);

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
      let targetPost = await Post.findOne({
        where: {
          id: req.params.id
        }
      });

      if(!targetPost) {
        res.status(404).json({data: null, message: "not found post"})
      }
      // let {imageUrl, title, contents} = req.body;
      await Post.update(//! update는 사용법이 다름// 행위에 대한 결과를 돌려주지 않으므로 변수에 담을 수 없음
        {
          imageUrl: req.body.imageUrl,
          title: req.body.title,
          contents: req.body.contents
        },
        {
          where: {
            id: req.params.id//!확인해보니 Number로 안 바꿔줘도 됨
          }
        });

        
        let updatedPost = await Post.findOne({
          where: {id: req.params.id}
        })
        console.log('----------->>>>>>>>>',updatedPost);
        
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
            tagId: tagId 
          }
        });
      })
      let {id, userId, title, contents, imageUrl, createdAt, updatedAt} = updatedPost.dataValues;//!dataValues를 제거해도 상관없음
      res.status(200).json({postData: {id, userId, title, contents, imageUrl, createdAt, updatedAt}, message: "updated ok" });
    });
    
  }
}
//Post.update 참고 - https://jetalog.net/83