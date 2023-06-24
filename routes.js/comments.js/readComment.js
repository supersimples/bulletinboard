const express = require('express');
const router = express.Router();
const pool = require('../../db');

// 답글 fetch 미들웨어
const fetchReply = async (req, res, next) => {
  const connection = await pool.getConnection();

  const bulletin_id = req.params.id;

  const time = 'DATE_FORMAT(time, "%y-%m-%d %H:%i") AS time';

  const [rows, fields] = await connection.execute(
    `SELECT id, bulletin_id, user_id, nickname, content, 
      ${time}, parent_comment  FROM comments 
      WHERE bulletin_id=? AND parent_comment > 0`,
    [bulletin_id]  
  );

  req.reply = rows;

  next();
  connection.release();
};

// 댓글 fetch router
router.get('/:id', fetchReply, async (req, res) => {
  const connection = await pool.getConnection();

  const bulletin_id = req.params.id;
  const replies = req.reply;

  const time = 'DATE_FORMAT(time, "%y-%m-%d %H:%i") AS time';

  const [rows, fields] = await connection.execute(
    `SELECT id, bulletin_id, user_id, nickname, content, 
      ${time}, parent_comment FROM comments 
      WHERE bulletin_id=? AND parent_comment IS NULL`,
    [bulletin_id]  
  );
  
  // 답글 없을 시 댓글만 보냄
  if(!replies.length) {
    res.send(rows);
    connection.release();
    return;
  }

  // 초기 및 이전 댓글 배열
  let previousComments = rows;
  // 답글이 모두 포함될 댓글 배열
  let commentsIncludedReplies;

  // 각각의 답글에 대해 댓글과 matching (해당 댓글의 replies속성에 배열로 할당)
  for(const reply of replies) {
    commentsIncludedReplies = previousComments.map(comment => {
      const updatedComments = (comment.id === reply.parent_comment) ? (
        comment.replies ? {
          ...comment,
          replies: comment.replies.concat(reply)
        } : {
          ...comment,
          replies: [reply]
        }
      ) : comment

      return updatedComments;
    });

    // 하나의 답글이 matching된 comments배열을 다음 반복문의 previous에 넣음 
    // 하나의 변경사항에 대해 축적해서 저장해야 하기 때문
    previousComments = commentsIncludedReplies;
  }

  res.send(commentsIncludedReplies);
  connection.release();
});

module.exports = router;