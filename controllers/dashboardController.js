const { Post } = require('../models');

const dashboardController = {
  renderDashboard: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.render('dashboard', { posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  },

  renderNewPost: (req, res) => {
    res.render('new-post');
  },

  handleNewPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const newPost = await Post.create({ title, content });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create a new post' });
    }
  },

  renderEditPost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      res.render('edit-post', { post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve the post' });
    }
  },

  handleUpdatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      await Post.update({ title, content }, { where: { id } });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update the post' });
    }
  },

  handleDeletePost: async (req, res) => {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id } });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete the post' });
    }
  },
};

module.exports = dashboardController;
