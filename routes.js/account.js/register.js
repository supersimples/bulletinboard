const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const pool = require('../../db');

const loginRouter = require('./login');
const validateDupRegister = require('./validateAccount.js/validateDupRegister');

// 회원가입 api 요청 처리
router.post('/', validateDupRegister, async (req, res, next) => { 
  const connection = await pool.getConnection();

  const {email, nickname, user_id, password} = req.body;

  const hash = await argon2.hash(password); //비밀번호 암호화

  const [rows, fields] = await connection.execute(
    'INSERT INTO user VALUES(?,?,?,?)',
    [email, user_id, hash, nickname]
    );

  req.Registered = true;
  req.user = {user_id, nickname};

  next();
  connection.release();
});

// 회원가입 성공 시 자동 로그인
router.use('/', loginRouter);

module.exports = router;

