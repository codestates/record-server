
const {User, sequelize} = require('../../models');//user모델 가져오기
// const defaultImage = require('../../resources/empty-profile.png');//! 프론트에서 뿌려주기로 했음

module.exports = {
  post: async(req, res) => {
    //회원가입
    // console.log('--------->>>>>>',req.body);
    let {email, password, username} = req.body;
    if(!email || !password || !username) {
      res.status(422).json({data: null, message: "insufficient parameters supplied"})
    }
    // console.log('------>>>>>>>>',User)
    let [newUser, created] = await User.findOrCreate({
      where: {email: email},
      defaults: {
        username: username,
        password: password,
        // profileImg: defaultImage
      }
    })

    if(!created) {
      res.status(409).json("email exists")
    } else {
      // console.log('-------->>>>>>>>>', newUser);
      let {id, username, email} = newUser;
      res.status(201).json({
        data: {
          userInfo: {id, username, email}
        }, 
        message: "successfully registered!"
      });
    }


  }
};