const router = require('express').Router();
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('registr');
});

router.post('/', async (req, res) => {
  const { inputNameRegistr, emailRegistr, passwordRegistr } = req.body;
  const hasedPass = await bcrypt.hash(passwordRegistr, 10);
  try {
    const [currUser, created] = await User.findOrCreate({
      where: {
        name: inputNameRegistr,
      },
      defaults: {
        email: emailRegistr,
        password: hasedPass,
        admin: false,
      },
    });
    if (!created) {
      return res.json('no');
    }
    req.session.name = currUser.name;
    req.session.email = currUser.email;
    req.session.userId = currUser.id;
    req.session.admin = currUser.admin;

    return res.json('ok');
  } catch (error) {
    return res.json('no2');
  }
});

module.exports = router;
