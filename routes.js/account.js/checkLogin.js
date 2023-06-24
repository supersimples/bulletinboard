const jwt = require('jsonwebtoken');

const {key} = require('../../secretKey');

// checkLogin(JWT 유효성 검사) 미들웨어
const checkLogin = (req, res, next) => {
  // api req에 jwt 없을 시
  if(!req.cookies.access_token) {
    req.loginState = false;
    next();
    return;
  }
  
  const {access_token} = req.cookies;
  
  // 로그인 유저 정보 저장될 변수
  let user_info;

  //jwt 유효성 검사 및 복호화
  try {
    user_info = jwt.verify(access_token, key); 
  } catch(e) {
    // jwt 형식이 올바르지 않을 경우 access_token 삭제 및 404에러 코드 전달
    res.clearCookie('access_token').status(404).send(e); 
    return;
  }

  req.loginState = true;
  req.user_info = user_info;

  next();
};

module.exports = { checkLogin };