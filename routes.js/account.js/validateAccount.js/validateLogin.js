const pool = require("../../../db");
const argon2 = require('argon2');

const validateLogin = async (req, res, next) => {
  // 회원가입 완료 시 자동로그인(유효성 검사 pass)
  if(req.registered) {
    next();
    return;
  }

  const connection = await pool.getConnection();

  const {user_id, password} = req.body;

  const [rows, fields] = await connection.execute(
    'SELECT user_id, password, nickname FROM user WHERE user_id=?',
    [user_id]  
  );

  // mysql에서 select시 id가 일치하는 값이 없으면 빈 배열이 반환됨.
  if (!rows.length) {
    console.log('아이디가 일치하지 않음');

  // res.status후 end하지 않으면 응답이 제대로 보내지지 않아 에러status가 적용안됨.
  // 마지막에 return 하지 않으면 아래 res가 적용되지 않고 밑res까지 실행되다 500오류 발생
    res.status(403).end();
    return;
  }
  if (!(await argon2.verify(rows[0].password, password))) {
    console.log('비밀번호가 일치하지 않음');
    res.status(403).end();
    return;
  }

  const nickname = rows[0].nickname;
  req.user = {user_id, nickname};

  next();
  connection.release();
};

module.exports = validateLogin;