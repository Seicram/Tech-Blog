const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// Create a new user
router.post('/sign-up', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });

    req.session.user_id = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;

    res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create a new user' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.checkPassword(password))) {
      res.status(400).json({ error: 'Incorrect username or password' });
      return;
    }

    req.session.user_id = user.id;
    req.session.loggedIn = true;

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to log out' });
        return;
      }
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
