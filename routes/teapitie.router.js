const router = require('express').Router();
const { Op } = require('sequelize');
const { Tea, Comment, User } = require('../db/models');

router.post('/', async (req, res) => {
  try {
    const data = await Tea.findOne({ where: { title: req.body.target } });
    res.json({ data });
  } catch (error) {
    alert('something went wrong :( fetch post /tea');
  }
});

router.get('/', async (req, res) => {
  try {
    const allTeas = await Tea.findAll();
    res.json(allTeas);
  } catch (error) {
    alert('something went wrong :( fetch: get /tea');
  }
});

router.get('/:latitude/:longitude', async (req, res) => {
  const { latitude } = req.params;
  const { longitude } = req.params;
  try {
    const tea = await Tea.findOne({
      where: { [Op.and]: [{ latitude }, { longitude }] },
      include: {
        model: Comment,
        include: {
          model: User,
        },
      },
    });
    return res.render('teaview', { tea });
  } catch (error) {
    alert('что-то пошло не так');
  }
});

module.exports = router;
