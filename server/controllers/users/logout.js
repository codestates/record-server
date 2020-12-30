
module.exports = {
  post: (req, res) => {
    console.log('===========>>>>>>>>',req.headers);
    let refreshToken = req.headers.cookie.split('=')[1];
      // console.log('===========>>>>>>>>',refreshToken);
    if(!refreshToken) {
      res.status(400).json({data: null, message: "not authorized"});
    } else {
      res.clearCookie('refreshToken');//! express메소드
      res.status(200).json({data: null, message: "successfully log out!"})
    }
  }
}
// {
//   "email": "sdfsafd@sdaf.com",
//   "password": "1234"
// }