const {user} = require('../../models');//user모델 가져오기
const defaultImage = require('../../resources/empty-profile.png');//!

module.exports = {
  post: async(req, res) => {
    //회원가입
    // console.log('--------->>>>>>',req.body);
    let {email, password, username} = req.body;
    if(!email || !password || !username) {
      res.status(422).json({data: null, message: "insufficient parameters supplied"})
    }
    
    let [newUser, created] = await user.findOrCreate({
      where: {email: email},
      defaults: {
        username: username,
        password: password,
        profileImg: defaultImage
      }
    })

    if(!created) {
      res.status(409).json("email exists")
    } else {
      let {id, username, email, profileImg} = newUser;
      res.status(201).json({data: {id, username, email, profileImg}, message: "successfully registered!"});
    }


  },

}