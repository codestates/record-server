const {Post, Sequelize} = require('../../models');
const { Op } = require("sequelize");//!
// const moment = require('moment');//최신날짜 subtract해주는 모듈

module.exports = {

  get: async(req, res) => {
    let {keywords} = req.body;
    if(!keywords) {
      res.status(400).json({data: null, message: "insufficient parameters supplied"})
    }
    // console.log('-------->>>>>>>>',keywords);
    let allPosts = await Post.findAll({
        where: {
          [Op.or]: [
              {title: {
                [Op.like]: `${keywords}%`,
                [Op.like]: `%${keywords}%`,
                // [Op.like]: `%${keywords}`//!얘가 원흉 -> 키워드 뒤에 아무것도 없는것만 나오게하는꼴
              }},
              {contents: {
                [Op.like]: `${keywords}%`,
                [Op.like]: `%${keywords}%`,
                // [Op.like]: `%${keywords}` 
              }}
          ]
          // title: keywords
        }
      })


    let results = allPosts.map(el => el.dataValues);
    // console.log('===========>>>>>>>>',results);
    
    
    res.status(200).json({postsData: results, message: "searched ok"});
  }

};

// const {Post, Sequelize} = require('../../models');
// const { Op } = require("sequelize");//!
// // const moment = require('moment');//최신날짜 subtract해주는 모듈

// module.exports = {

//   get: async(req, res) => {
//     let {keywords} = req.body;
//     if(!keywords) {
//       res.status(400).json({data: null, message: "insufficient parameters supplied"})
//     }
//     let arrayKeywords = keywords.split(' ');
//     let allPosts = arrayKeywords.reduce((acc, keyword) => {
//       Post.findAll({
//         where: {
//           [Op.or]: [{
//               title: {
//                 [Op.like]: `${keyword}%`,
//                 [Op.like]: `%${keyword}%`,
//                 [Op.like]: `%${keyword}` 
//               },
//               contents: {
//                 [Op.like]: `${keyword}%`,
//                 [Op.like]: `%${keyword}%`,
//                 [Op.like]: `%${keyword}` 
//               }
//           }]
//         }
//       })
//       .then(result => {

//       })
//       acc.concat(foundPosts);
//       return acc;
//     },[]);

//     console.log('===========>>>>>>>>',allPosts);

//     let postIds = allPosts.reduce((acc, val) => {
//       if(acc.indexOf(val.dataValues.id) === -1) {
//         acc.push(val.dataValues.id);
//       }
//       return acc;
//     },[])
//     let results = postIds.map(async(postId) => {
//       let searchedPost = await Post.findOne({
//         where: {
//           id: postId
//         }
//       })
//       return searchedPost.dataValues
//     })
//     res.status(200).json({data: {postsData: results}, message: "searched ok"});
//   }

// };

//Op.gte 참고 - https://stackoverflow.com/questions/60355504/how-to-get-all-records-from-the-last-7-days-sequelize
//Sequelize.fn('max', Sequelize.col('like')) - https://stackoverflow.com/questions/51916911/how-to-get-maxid-group-by-other-field-with-sequalize-js