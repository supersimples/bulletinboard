const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.post('/', async(req, res)=> {
  const connection = await pool.getConnection();

  const {title, content, user_id, nickname, type} = req.body;
  // time이 한국시간의 -9h인 utc시간으로 저장이 되어 생성 및 수정 시 현재시간 +9h함
  // my.cnf 파일을 수정하면 된다곤 하나 계속 적용이 안됨
  const [rows, fields] = await connection.execute(
    `INSERT INTO bulletin(title, content, user_id, nickname, time, type) 
      VALUES(?,?,?,?, CURRENT_TIMESTAMP + INTERVAL 9 HOUR, ?)`,
    [title, content, user_id, nickname, type]  
  );

  res.end();
  connection.release();
});

module.exports = router;