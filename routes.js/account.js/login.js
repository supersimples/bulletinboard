const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const validateLogin = require('./validateAccount.js/validateLogin');
const {key} = require('../../secretKey');

// 로그인 api 요청 처리
router.post('/', validateLogin, async (req, res) => {
  const {user_id, nickname} = req.user;

  const access_token = jwt.sign({user_id, nickname}, key);
  
  res.cookie('access_token', access_token, {
    httpOnly: true,
    maxAge: 3600000 //jwt 1시간 유효
  }).end();
});

module.exports = router;