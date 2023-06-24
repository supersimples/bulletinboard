const express = require('express');
const router = express.Router();
const pool = require('../../db');

// 유저의 작성 글 fetch middleware
const fetchUserBulletin = async(req, res, next) => {  
  const connection = await pool.getConnection();

  const {nickname} = req.params;

  const time = 'DATE_FORMAT(time, "%y-%m-%d %H:%i") AS time'; 
  const [rows, fields] = await connection.execute(
    `SELECT id, title, nickname, ${time}, type FROM bulletin WHERE nickname=?`,
    [nickname]
  );

  const data = rows.reverse();

  req.userBulletin = data; 
  next();

  connection.release();
};

// 유저의 댓글 단 글 fetch middleware
const fetchUserBulletinWithComments = async(req, res, next) => {  
  const connection = await pool.getConnection();

  const {nickname} = req.params;

  const time = 'DATE_FORMAT(b.time, "%y-%m-%d %H:%i") AS time'; 
  // 게시글, 댓글 테이블 inner join후 추출 / group by 통해 중복제거 및 정렬
  const [rows, fields] = await connection.execute(
    `SELECT b.id, b.title, b.nickname, ${time}, b.type 
      FROM comments c, bulletin b 
      WHERE c.bulletin_id = b.id AND c.nickname=?
      GROUP BY b.id`,
    [nickname]
  );

  const data = rows.reverse();
  
  req.userBulletinWithComments = data; 
  next(); 

  connection.release();
};

// 유저페이지, 유저의 작성 글 및 댓글단 글 fetch  
router.get('/:nickname', [
  fetchUserBulletin, fetchUserBulletinWithComments],
  (req, res) => {
    const {userBulletin, userBulletinWithComments} = req;
    
    res.send({userBulletin, userBulletinWithComments});
});

module.exports = router;