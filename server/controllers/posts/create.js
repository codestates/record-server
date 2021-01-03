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
      let {id, userId, title, contents, imageUrl, createdAt, updatedAt} = newPost.dataValues
      res.status(201).json({postData: {id, userId, title, contents, imageUrl, createdAt, updatedAt}, message: "created ok" });
    });
  }

};

// {
//   "title": "밥은 먹고 코딩합시다",
//   "contents": "다 먹고 살자고 하는건데...",
//   "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAADNCAMAAAAsYgRbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABJQTFRF3NSmzMewPxIG//ncJEJsldTou1jHgAAAARBJREFUeNrs2EEKgCAQBVDLuv+V20dENbMY831wKz4Y/VHb/5RGQ0NDQ0NDQ0NDQ0NDQ0NDQ 0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PzMWtyaGhoaGhoaGhoaGhoaGhoxtb0QGhoaGhoaGhoaGhoaGhoaMbRLEvv50VTQ9OTQ5OpyZ01GpM2g0bfmDQaL7S+ofFC6xv3ZpxJiywakzbvd9r3RWPS9I2+MWk0+kbf0Hih9Y17U0nTHibrDDQ0NDQ0NDQ0NDQ0NDQ0NTXbRSL/AK72o6GhoaGhoRlL8951vwsNDQ0NDQ1NDc0WyHtDTEhD Q0NDQ0NTS5MdGhoaGhoaGhoaGhoaGhoaGhoaGhoaGposzSHAAErMwwQ2HwRQAAAAAElFTkSuQmCC",
//   "tagNames": ["봉구스밥버거", "밥밥띠라랍"]
// }

// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAADNCAMAAAAsYgRbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABJQTFRF3NSmzMewPxIG//ncJEJsldTou1jHgAAAARBJREFUeNrs2EEKgCAQBVDLuv+V20dENbMY831wKz4Y/VHb/5RGQ0NDQ0NDQ0NDQ0NDQ0NDQ 0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PzMWtyaGhoaGhoaGhoaGhoaGhoxtb0QGhoaGhoaGhoaGhoaGhoaMbRLEvv50VTQ9OTQ5OpyZ01GpM2g0bfmDQaL7S+ofFC6xv3ZpxJiywakzbvd9r3RWPS9I2+MWk0+kbf0Hih9Y17U0nTHibrDDQ0NDQ0NDQ0NDQ0NDQ0NTXbRSL/AK72o6GhoaGhoRlL8951vwsNDQ0NDQ1NDc0WyHtDTEhD Q0NDQ0NTS5MdGhoaGhoaGhoaGhoaGhoaGhoaGhoaGposzSHAAErMwwQ2HwRQAAAAAElFTkSuQmCC


// const {Post, Tag, Post_Tag} = require('../../models');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// module.exports = {

//   post: async(req, res) => {
//     if(!req.body.title || !req.body.contents) {
//       res.status(400).json({ data: null, message: "insufficient parameters supplied" });
//     }
//     if(!req.headers['authorization']) {
//       res.status(403).json({ data: null, message: "invalid access token" });
//     }
//     let accessToken = req.headers['authorization'].split(' ')[1];
//     jwt.verify(accessToken, process.env.ACCESS_SECRET, async(err, decoded) => {
//       if(err) {
//         res.status(401).json({ data: null, message: "not authorized" });
//       }
//       // let {imageUrl, title, contents} = req.body;
//       let newPost = await Post.create({//새로운 포스트 DB생성
//           userId: decoded.id,
//           imageUrl: req.body.imageUrl,
//           title: req.body.title,
//           contents: req.body.contents
//       });

//       // console.log('======>>>>>>>>>>',newPost);

//       let {tagNames} = req.body;

//       async(tagNames) => {
        
//       }

//       tagNames.map(el => {})

//         await Tag.findOrCreate({
//           where: {tagName: tagName}
//         });


//         let foundTag = await Tag.findAll({
//           where: {tagName: tagName}
//         });

    

//         await Post_Tag.bulkCreate([{//postId는 unique하니까 create
//           postId: newPost.id,
//           tagId: tagId
//         }]);

//       let {id, userId, title, contents, imageUrl, createdAt, updatedAt} = newPost.dataValues
//       res.status(201).json({ data: {postData: {id, userId, title, contents, imageUrl, createdAt, updatedAt}}, message: "created ok" });
//     });
//   }

// };