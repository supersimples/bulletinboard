const express = require('express');
const router = express.Router();

const loginRouter = require('./login');
const registerRouter = require('./register');
const { checkLogin } = require('./checkLogin');

router.use('/login', loginRouter);
router.use('/register', registerRouter);

// 현재 로그인 상태인지 확인
router.get('/checklogin', checkLogin , (req, res) => {
  const { loginState } = req;

  let loginUser_id, loginUser_nickname;

  // 로그인 상태 시 로그인 유저 정보 함께 전달
  if(loginState) {
    loginUser_id = req.user_info.user_id;
    loginUser_nickname = req.user_info.nickname;
  }

  res.send({
    isLoggedIn: loginState,
    loginUser_id,
    loginUser_nickname
  }); 
});

// 로그아웃 api 요청 처리
router.get('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.send('removed');
});

module.exports = router;