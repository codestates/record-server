const {Post, Sequelize} = require('../../models');
const moment = require('moment');//최신날짜 subtract해주는 모듈

module.exports = {
  post: async(req, res) => {
    let numberOfCards = req.body.numberOfCards;//요청받은 카드글 갯수
    let listCondition = req.body.listCondition;//보내줄 조건(최신순'recent' or 좋아요순'like')
    if(listCondition === 'like') {
      const {count, rows} = await Post.findAndCountAll({
        where: {
          attributes: [Sequelize.fn('max', Sequelize.col('like'))]
        },
        limit: numberOfCards
      })

      res.status(200).json({data: [rows,count], message: "ok"});
    }
    
    else {//else if(listCondition === 'recent') {
      const {count, rows} = await Post.findAndCountAll({
        where: {
          createdAt: {
            [Op.gte]: moment().subtract(7, 'days').toDate()
          }
        },
        limit: numberOfCards
      })

      res.status(200).json({data: [rows,count], message: "ok"});
    }
  }
}

//Op.gte 참고 - https://stackoverflow.com/questions/60355504/how-to-get-all-records-from-the-last-7-days-sequelize
//Sequelize.fn('max', Sequelize.col('like')) - https://stackoverflow.com/questions/51916911/how-to-get-maxid-group-by-other-field-with-sequalize-js