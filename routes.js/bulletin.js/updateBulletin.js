const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.put('/', async(req, res) => {
  const connection = await pool.getConnection();

  const {id, title, content} = req.body;
  
  const [rows, fields] = await connection.execute(
    'UPDATE bulletin SET title=?, content=?, time= CURRENT_TIMESTAMP + INTERVAL 9 HOUR WHERE id=?',
    [title, content, id]
  );

  res.end();
  connection.release();
});

module.exports = router;