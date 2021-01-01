
const {User, sequelize} = require('../../models');//user모델 가져오기
// const defaultImage = require('../../resources/empty-profile.png');//! 프론트에서 뿌려주기로 했음

module.exports = {
  post: async(req, res) => {
    //회원가입
    // console.log('--------->>>>>>',req.body);
    let {email, username, password, passwordCheck} = req.body;
    if(!email || !password || !username || !passwordCheck) {
      res.status(422).json({data: null, message: "insufficient parameters supplied"})
    }
    if(password !== passwordCheck) {
      res.status(400).json({data: null, message: "passwordCheck does not correspond with password"})
    }
    // console.log('------>>>>>>>>',User)
    let [newUser, created] = await User.findOrCreate({
      where: {email: email},
      defaults: {
        username: username,
        password: password,
      }
    })

    if(!created) {
      res.status(409).json("email already exists");
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