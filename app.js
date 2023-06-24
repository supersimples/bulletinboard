const express = require('express');
//비동기 동작 중 오류 발생시 아래 에러 핸들러에서 감지 가능하게 해줌 / 작동하는지 확인필요@@
require("express-async-errors");  
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const bulletinRouter = require('./routes.js/bulletin.js/bulletin');
const accountRouter = require('./routes.js/account.js/account');
const commentsRouter = require('./routes.js/comments.js/comments');

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/crud-react/build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/crud-react/build/index.html');
  res.end();
});

app.use('/bulletin', bulletinRouter);
app.use('/account', accountRouter);
app.use('/comments', commentsRouter);

// 해당 요청 경로에 대한 반응이 없는 경우 404 error 전달
// 아래 에러 핸들러로 이동
app.use(function (req, res, next) {
  const err = new Error("Not Found : 404 error");
  err.status = 404;
  next(err);
});

// global error handler middleware 
app.use(function (err, req, res, next) {
  // 에러 상태 전달
  console.log(err);
  res.status(err.status || 500).send(err.message);
});

app.listen(5000, () => {
  console.log('server on');
});
