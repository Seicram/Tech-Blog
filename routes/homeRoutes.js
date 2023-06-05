const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

// Home route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    res.render('home', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve home page' });
  }
});

module.exports = router;
