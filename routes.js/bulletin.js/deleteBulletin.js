const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.delete('/', async(req, res) => {
  const connection = await pool.getConnection();

  const {id} = req.query;

  const [rows, fields] = await connection.execute(
    'DELETE FROM bulletin WHERE id=?',
    [id]  
  );

  res.end();
  connection.release();
});

module.exports = router;