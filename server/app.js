const express = require('express')
const app = express()
const port = 4000//3000(리액트port이므로) -> 4000

// require('dotenv').config();
// console.log('---->>>>>>>>',process.env);//!
app.use(express.static('public'));//! 클라이언트에서 가져온 build 이름 public으로 바꾼거

const cors = require('cors');
const cookieParser = require('cookie-parser');
// const session = require('express-session');

const controllers = require('./controllers')

app.use(cookieParser());//cookie-parser
app.use(express.json());//body-parser -> json처리
app.use(express.urlencoded({extended: false}));//body-parser -> ?처리

// app.use(session({
//   secrets: "@codestates",
//   resave: false,
//   saveUninitialized: true
// }))

app.use(cors({
  origin: [
    'http://localhost:3000',
    //public IP??
  ],
  methods: ['OPTIONS','GET','POST','PUT','DELETE'],
  credentials: true
}));

const usersRouter = require('./routes/users');
// const postsRouter = require('./routes/posts');
// const commentsRouter = require('./routes/comments');
// const tagsRouter = require('./routes/tags');

app.use('/users', usersRouter);
// app.use('/posts', postsRouter);
// app.use('/comments', commentsRouter);
// app.use('/tags', tagsRouter);

app.get('/accesstokenrequest', controllers.accessTokenRequest);//라우터 없이 바로 응답하게끔
app.get('/refreshtokenrequest', controllers.refreshTokenRequest);//


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});