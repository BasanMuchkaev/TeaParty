/* eslint-disable camelcase */
const router = require('express').Router();
const { Comment } = require('../db/models');

router
  .route('/:id')
  .get((req, res) => {
    res.render('teaview');
  })
  .post(async (req, res) => {
    try {
      const { post } = req.body.myform;
      const { id } = req.body;
      const user_id = req.session.userId;
      const addpost = await Comment.create({
        post, user_id, tea_id: id, createdAt: new Date(), updatedAt: new Date(),
      });
      res.json(addpost);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
