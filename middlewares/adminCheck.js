function adminCheck(req, res, next) {
  if (req.session?.admin !== true) {
    res.redirect('/');
  } else {
    next();
  }
}

module.exports = adminCheck;
