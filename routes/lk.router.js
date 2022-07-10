const router = require('express').Router();
const { Tea, User, Comment } = require('../db/models');
const adminCheck = require('../middlewares/adminCheck');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const data = await Tea.findAll();
      const comment = await Comment.findAll({
        include: {
          model: User,
        },
      });
      return res.render('adminlk', { data, comment });
    } catch (error) {
      res.sendStatus(500);
    }
  })

  .post((req, res) => {
    const {
      title, description, location, img,
    } = req.body.allform;
    const { coords } = req.body;
    // console.log(coords, description);
    const addTea = Tea.create({
      // eslint-disable-next-line max-len
      title, description, location, img, latitude: coords[0], longitude: coords[1], createdAt: new Date(), updatedAt: new Date(),
    });
    res.sendStatus(200);
  });

router.get('/all', async (req, res) => {
  try {
    const data = await Tea.findAll();
    const comment = await Comment.findAll({
      include: {
        model: User,
      },
    });
    res.json({ data, comment });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete('/tea/:id', adminCheck, async (req, res) => {
  try {
    // console.log(await Tea.findOne({ where: { id: req.params.id } }));
    console.log('ya tut');
    await Tea.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (error) {
    return res.json({ error }).status(500);
  }
});

// Роутер для удаления комментариев
router.delete('/comment/:id', adminCheck, async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (error) {
    return res.json({ error }).status(500);
  }
});

module.exports = router;
