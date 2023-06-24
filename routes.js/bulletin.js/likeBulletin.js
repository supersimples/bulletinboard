const express = require('express');
const router = express.Router();
const pool = require('../../db');

const { checkLogin } = require('../account.js/checkLogin');

// 유저가 해당 게시글 좋아요 했는지 확인
router.get('/:id', checkLogin, async(req, res)=> {
  const connection = await pool.getConnection();
  
  const {loginState} = req;
  
  if(!loginState) {
    res.send(false);
    return;
  }

  const {user_id} = req.user_info;
  const {id} = req.params;

  const [rows, fields] = await connection.execute(
    `SELECT * FROM likedBulletin WHERE user_id=? AND bulletin_id=?`,
    [user_id, id]  
  );

  if(rows.length > 0) res.send(true);
  else res.send(false);

  connection.release();
});

// 해당 게시글 좋아요 수 fetch
router.get('/:id/count', async(req, res)=> {
  const connection = await pool.getConnection();

  const {id} = req.params;

  const [rows, fields] = await connection.execute(
    `SELECT COUNT(bulletin_id) AS count FROM likedBulletin 
      GROUP BY bulletin_id HAVING bulletin_id=?`,
    [id]  
  );

  if(!rows.length) res.send({count: 0});
  else res.send(rows[0]);

  connection.release();
});

// 유저가 해당 게시글에 좋아요 추가(설정)
router.post('/', async(req, res)=> {
  const connection = await pool.getConnection();

  const {user_id, bulletin_id} = req.body;

  const [rows, fields] = await connection.execute(
    'INSERT INTO likedBulletin(user_id, bulletin_id) VALUES(?,?)',
    [user_id, bulletin_id]  
  );

  res.end();
  connection.release();
});

// 유저가 해당 게시글에 좋아요 삭제(취소)
router.delete('/', checkLogin, async(req, res)=> {
  const connection = await pool.getConnection();

  const {user_id} = req.user_info;
  const {bulletin_id} = req.query;

  const [rows, fields] = await connection.execute(
    'DELETE FROM likedBulletin WHERE user_id=? AND bulletin_id=?',
    [user_id, bulletin_id]  
  );

  res.end();
  connection.release();
});

module.exports = router;