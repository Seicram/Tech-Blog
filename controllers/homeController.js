const { Post } = require('../models');

const homeController = {
  renderHomePage: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.render('homepage', { posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  },
};

module.exports = homeController;
