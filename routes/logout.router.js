const router = require('express').Router();

// router.get('/logout', (req, res) => {
//   res.render('exLogout');
// });

router.post('/', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.sendStatus(200);
});

module.exports = router;
