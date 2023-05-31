// postControllers.js

const Post = require('../models/post');

const renderPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('author').populate({
      path: 'comments',
      populate: { path: 'author' },
    });

    if (!post) {
      return res.status(404).render('error', { message: 'Post not found' });
    }

    res.render('post', { post });
  } catch (error) {
    console.error('Error occurred while fetching the post:', error);
    res.redirect('/');
  }
};

const renderNewPost = (req, res) => {
  res.render('newpost');
};

const handleNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user._id,
    });
    await post.save();
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error occurred while creating the post:', error);
    res.redirect('/newpost');
  }
};

const renderEditPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).render('error', { message: 'Post not found' });
    }

    res.render('editpost', { post });
  } catch (error) {
    console.error('Error occurred while fetching the post:', error);
    res.redirect('/dashboard');
  }
};

const handleEditPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(postId, { title, content });
    res.redirect(`/post/${postId}`);
  } catch (error) {
    console.error('Error occurred while editing the post:', error);
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

const handleAddComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).render('error', { message: 'Post not found' });
    }

    post.comments.push({
      content: comment,
      author: req.user._id,
    });

    await post.save();
    res.redirect(`/post/${postId}`);
  } catch (error) {
    console.error('Error occurred while adding the comment:', error);
    res.redirect(`/post/${postId}`);
  }
};

// Other controller functions

module.exports = {
  renderPost,
  renderNewPost,
  handleNewPost,
  renderEditPost,
  handleEditPost,
  handleDeletePost,
  handleAddComment,
  // Other controller functions
};
