const express = require('express')
const app = express()
const port = 4000//3000(리액트port이므로) -> 4000

// require('dotenv').config();
// console.log('---->>>>>>>>',process.env);//!
app.use(express.static('public'));//! 클라이언트에서 가져온 build 이름 public으로 바꾼거

const cors = require('cors');
const cookieParser = require('cookie-parser');

const controllers = require('./controllers');//!

app.use(cookieParser());//cookie-parser
app.use(express.json());//body-parser -> json처리

app.use(express.urlencoded({extended: false}));//body-parser -> URI 처리 fsdsdf=q?sfdsdf:id //extend는 확장판 이므로 extended: false는 default로

                                              //!extended: false로 하면 TEXT('long')사용 못함
                                              //!extended: true로 해야 긴 string을 주고받을수있음

app.use(cors({
  origin: [

    'http://localhost:3000',//!배포할때 꼭 추가할것

    //public IP??
  ],
  methods: ['OPTIONS','GET','POST','PUT','DELETE'],
  credentials: true
}));

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);
const commentsRouter = require('./routes/comments');
app.use('/comments', commentsRouter);


app.get('/', (req, res) => {
  res.redirect('/posts/read');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
