const { Post } = require('../models');

// Handle rendering the home page
const renderHomePage = async (req, res) => {
  try {
    // Get all posts
    const posts = await Post.find();

    res.render('home', { posts });
  } catch (error) {
    // Handle error
    console.error('Error occurred while rendering home page:', error);
    res.render('home', { error: 'An error occurred while rendering the home page' });
  }
};

module.exports = {
  renderHomePage,
};
