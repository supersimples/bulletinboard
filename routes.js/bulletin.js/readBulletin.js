const express = require('express');
const router = express.Router();
const pool = require('../../db');

//전체 게시글 fetch
router.get('/', async(req, res) => { 
  const connection = await pool.getConnection();
  
  const time = 'DATE_FORMAT(time, "%y-%m-%d %H:%i") AS time'; 
  const [rows, fields] = await connection.execute(
    `SELECT id, title, nickname, ${time}, type FROM bulletin`
    );

  const data = rows.reverse();

  res.send(data);
  connection.release();
});

// 해당 게시판의 게시글 fetch
router.get('/:type', async(req, res) => { 
  const connection = await pool.getConnection();

  const {type} = req.params;
  
  const time = 'DATE_FORMAT(time, "%y-%m-%d %H:%i") AS time'; 
  const [rows, fields] = await connection.execute(
    `SELECT id, title, nickname, ${time}, type FROM bulletin WHERE type=?`,
    [type]
  );

  const data = rows.reverse();

  res.send(data);
  connection.release();
});

//하나의 게시글만 fetch
router.get('/:type/:id', async(req, res) => {  
  const connection = await pool.getConnection();

  const {type, id} = req.params;

  const time = 'DATE_FORMAT(time, "%y-%m-%d %H:%i") AS time'; 
  const [rows, fields] = await connection.execute(
    `SELECT id, title, content, user_id, nickname, ${time} FROM bulletin 
      WHERE id=? AND type=?`,
    [id, type]
  );

  // rows 배열 내 객체 원소가 하나 이기 때문에 0번 인덱스 전달 
  res.send(rows[0]); 

  connection.release();
});

module.exports = router;