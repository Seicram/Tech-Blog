const { Post } = require('../models');

// Handle rendering the dashboard page
const renderDashboard = async (req, res) => {
  try {
    // Get all posts created by the current user
    const posts = await Post.find({ author: req.session.user._id });

    res.render('dashboard', { posts });
  } catch (error) {
    // Handle error
    console.error('Error occurred while rendering dashboard:', error);
    res.render('dashboard', { error: 'An error occurred while rendering the dashboard' });
  }
};

module.exports = {
  renderDashboard,
};
