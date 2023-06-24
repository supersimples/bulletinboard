const express = require('express');
const router = express.Router();

const readRouter = require('./readBulletin');
const createRouter = require('./createBulletin');
const updateRouter = require('./updateBulletin');
const deleteRouter = require('./deleteBulletin');
const likeRouter = require('./likeBulletin');
const userRouter = require('./userBulletin');

router.use('/likes', likeRouter);
router.use('/users', userRouter);
router.use('/', readRouter);
router.use('/', createRouter);
router.use('/', updateRouter);
router.use('/', deleteRouter);

module.exports = router;