const Post = require('../models/post');

const renderDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ author: userId });

    res.render('dashboard', { posts });
  } catch (error) {
    console.error('Error occurred while fetching blog posts:', error);
    res.redirect('/');
  }
};

const renderNewPost = (req, res) => {
  res.render('newpost');
};

const handleNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    // Check if both title and content are provided
    if (!title || !content) {
      return res.redirect('/newpost');
    }

    const post = new Post({
      title,
      content,
      author: req.user._id,
    });
    await post.save();

    // Redirect back to the dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error occurred while creating a new post:', error);
    res.redirect('/dashboard');
  }
};

const renderEditPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.redirect('/dashboard');
    }

    res.render('editpost', { post });
  } catch (error) {
    console.error('Error occurred while rendering edit post page:', error);
    res.redirect('/dashboard');
  }
};

const handleEditPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    if (!post) {
      return res.redirect('/dashboard');
    }

    res.redirect(`/dashboard`);
  } catch (error) {
    console.error('Error occurred while updating the post:', error);
    res.redirect('/dashboard');
  }
};

const handleDeletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error occurred while deleting the post:', error);
    res.redirect('/dashboard');
  }
};

module.exports = {
  renderDashboard,
  renderNewPost,
  handleNewPost,
  renderEditPost,
  handleEditPost,
  handleDeletePost,
};
