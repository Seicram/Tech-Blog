const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const blogData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = blogData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
});

// Specific post route
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ error: 'No post found with this ID' });
      return;
    }

    const post = blogData.get({ plain: true });

    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve the post' });
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

// Sign-up page
router.get('/sign-up', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('sign-up');
  }
});

// Dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = blogData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve user posts' });
  }
});

// Edit post route
router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ error: 'No post found with this ID' });
      return;
    }

    const post = blogData.get({ plain: true });

    res.render('edit-post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve the post' });
  }
});

// New post route
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', { loggedIn: req.session.loggedIn });
});

module.exports = router;
