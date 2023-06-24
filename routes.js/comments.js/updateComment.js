const express = require('express');
const router = express.Router();
const pool = require('../../db');

// 댓글 수정 router
router.put('/', async(req, res) => {
  const connection = await pool.getConnection();

  const {id, bulletin_id, content} = req.body;

  const [rows, fields] = await connection.execute(
    `UPDATE comments SET content=?, time= CURRENT_TIMESTAMP + INTERVAL 9 HOUR 
    WHERE id=? AND bulletin_id=?`,
    [content, id, bulletin_id]  
  );
  
  res.end();
  connection.release();
});

module.exports = router;