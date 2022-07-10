const router = require('express').Router();
const { Tea, User } = require('../db/models');

router
  .route('/tea')
  .get(async (req, res) => {
    const tea = await Tea.findOne({ where: { id: req.params.id } });
    res.json(tea);
  });

router
  .route()

module.exports = router;

