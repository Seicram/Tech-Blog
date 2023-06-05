const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const { ensureAuthenticated } = require('../middleware/auth');

// Dashboard route
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.user.id },
      include: [{ model: User, attributes: ['username'] }],
    });

    res.render('dashboard', { user: req.user, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve user dashboard' });
  }
});

module.exports = router;
