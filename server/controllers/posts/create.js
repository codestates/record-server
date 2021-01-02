const {Post, Tag, Post_Tag} = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
 
module.exports = {

  post: async(req, res) => {
    if(!req.body.title || !req.body.contents) {
      res.status(400).json({ data: null, message: "insufficient parameters supplied" });
    }
    if(!req.headers['authorization']) {
      res.status(403).json({ data: null, message: "invalid access token" });
    }
    let accessToken = req.headers['authorization'].split(' ')[1];
    jwt.verify(accessToken, process.env.ACCESS_SECRET, async(err, decoded) => {
      if(err) {
        res.status(401).json({ data: null, message: "not authorized" });
      }
      // let {imageUrl, title, contents} = req.body;
      let newPost = await Post.create({//새로운 포스트 DB생성
          userId: decoded.id,
          imageUrl: req.body.imageUrl,
          title: req.body.title,
          contents: req.body.contents
      });

      // console.log('======>>>>>>>>>>',newPost);

      let {tagNames} = req.body;
      tagNames.map(async(tagName) => {//없는 태그 DB생성
        await Tag.findOrCreate({
          where: {tagName: tagName}
        });
      })
      let foundTagIds = tagNames.map(async(tagName) => {//태그id만 추출한 배열
        let foundTag = await Tag.findOne({
          where: {tagName: tagName}
        });
        return foundTag.id;
      })
      foundTagIds.map(async(tagId) => {//join table에 입력
        await Post_Tag.create({//postId는 unique하니까 create
          postId: newPost.id,
          tagId: tagId
        });
      })
      let {id, userId, title, contents, imageUrl, created_at, updated_at} = newPost.dataValues
      res.status(201).json({ data: {postData: {id, userId, title, contents, imageUrl, created_at, updated_at}}, message: "created ok" });
    });
  }

};