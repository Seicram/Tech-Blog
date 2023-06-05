const express = require('express');
const router = express.Router();
const { User } = require('../models');
const passport = require('passport');

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to sign up' });
      } else {
        res.status(200).json({ message: 'Signed up successfully' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

// Log in route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Logged in successfully' });
});

// Log out route
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
