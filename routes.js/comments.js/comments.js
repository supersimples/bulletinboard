const express = require('express');
const router = express.Router();
const pool = require('../../db');

const createRouter = require('./createComment');
const readRouter = require('./readComment');
const updateRouter = require('./updateComment');
const deleteRouter = require('./deleteComment');

router.use('/', createRouter);
router.use('/', readRouter);
router.use('/', updateRouter);
router.use('/', deleteRouter);

// 한 게시글의 댓글 개수 산출
router.get('/:id/count', async (req, res) => {
  const connection = await pool.getConnection();

  const {id} = req.params;

  const [rows, fields] = await connection.execute(
    `SELECT COUNT(bulletin_id) AS count 
      FROM comments
      GROUP BY bulletin_id
      HAVING bulletin_id=?`,
    [id]
  );
  
  if(!rows.length) res.send({count: 0});
  else res.send(rows[0]);

  connection.release();
});

module.exports = router;