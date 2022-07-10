const router = require('express').Router();
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
const { User } = require('../db/models');

router.post('/', async (req, res) => {
  const { emailAuth, passwordAuth } = req.body;
  try {
    const user = await User.findOne({ where: { email: emailAuth } });
    if (user) {
      if (await bcrypt.compare(passwordAuth, user.password)) {
        req.session.name = user.name;
        req.session.email = user.email;
        req.session.userId = user.id;
        req.session.admin = user.admin;

        return res.json('200');
      } return res.json('400');
    }
    return res.json('400');
  } catch (error) {
    return res.json('400');
  }
});

module.exports = router;
