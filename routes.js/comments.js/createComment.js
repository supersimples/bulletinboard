const express = require('express');
const router = express.Router();
const pool = require('../../db');

// 추가된 댓글의 id를 db에 뭐로 저장할지 결정하는 미들웨어
const decideCommentsId = async (req, res, next) => {
  const connection = await pool.getConnection();

  const {bulletin_id} = req.body; 
  
  const [rows, fields] = await connection.execute(
    'SELECT id FROM comments WHERE bulletin_id=?', 
    [bulletin_id]
  );

  // 해당 게시글에 대한 댓글이 없을 경우 id 1부터 시작
  if (!rows.length) {
    req.id = 1;
    next();
    return;
  }

  // 해당 게시글에 댓글 있을 경우, 마지막 댓글 id + 1
  req.id = rows[rows.length - 1].id + 1;
  next();

  connection.release();
};

// 댓글 추가 router
router.post('/', decideCommentsId, async (req, res) => {
  const connection = await pool.getConnection();

  const {bulletin_id, user_id, nickname, content, parent_comment=null} = req.body;
  const comments_id = req.id;

  const sql = `INSERT INTO comments(
    id, bulletin_id, user_id, nickname, content, time, parent_comment)
    VALUES(?,?,?,?,?, CURRENT_TIMESTAMP + INTERVAL 9 HOUR, ?)`;

  const [rows, fields] = await connection.execute(
    sql,
    [comments_id, bulletin_id, user_id, nickname, content, parent_comment]
  );

  res.send(rows);

  connection.release();
});

module.exports = router;