const { Post, Comment } = require('../models');

const postController = {
  renderPost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id, {
        include: [{ model: Comment }],
      });
      res.render('post', { post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve the post' });
    }
  },
};

module.exports = postController;
