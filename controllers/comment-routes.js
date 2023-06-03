const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Add a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const { content, post_id } = req.body;

    const comment = await Comment.create({
      content,
      post_id,
      user_id: req.session.user_id,
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add a comment' });
  }
});

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
});

module.exports = router;
