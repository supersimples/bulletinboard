const express = require('express');
const router = express.Router();
const pool = require('../../db');

// 댓글 삭제 router
router.delete('/', async(req, res) => {
  const connection = await pool.getConnection();

  const {id, bulletin_id} = req.query;

  const [rows, fields] = await connection.execute(
    'DELETE FROM comments WHERE id=? AND bulletin_id=?',
    [id, bulletin_id]  
  );
  
  res.end();
  connection.release();
});

module.exports = router;