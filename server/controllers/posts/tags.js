const {Post, Tag, Post_Tag} = require('../../models');

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  get: async(req, res) => {
    if(!req.params.id) {                                                                      //Logic:필수값 유효성 검증
      res.status(400).json({ data: null, message: "insufficient parameters supplied" });
    }
    
    let targetPost = await Post.findOne({                                                    //Logic: 작성되지 않은 post 검사
      where: {
        id: req.params.id
      }
    })
    
    if(!targetPost) {
      res.status(404).json({data: null, message: "not found post"});
    }

    let foundPostTags = await Post_Tag.findAll({//새로운 포스트 DB생성
        where: {
          postId: req.params.id//!
        }
      });

    let foundTagIds = foundPostTags.map(async(el) => {                                                          //Logic:새로운 태그가 들어왔으면 db에생성
      return el.dataValues.tagId
    })

    let searchedTags = foundTagIds.map(async(tagId) => {                                      //Logic:태그id만 추출한 배열
      let foundTag = await Tag.findOne({
        where: {id: tagId}
      });
      return foundTag;
    })

    let results = searchedTags.map(async(tag) => {                                                    //Logic: join table DB에 없으면 생성
      return tag.dataValues.tagName;
    })
    
    res.status(200).json({ data: {tagsData: results}, message: "ok" });


  }
}