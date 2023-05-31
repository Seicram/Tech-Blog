const { Post, Comment } = require('../models');

// Handle rendering a single post
const renderPost = async (req, res) => {
  const postId = req.params.id;

  try {
    // Get the post with the specified ID
    const post = await Post.findById(postId).populate('author').populate('comments');

    if (post) {
      res.render('post', { post });
    } else {
      res.render('post', { error: 'Post not found' });
    }
  } catch (error) {
    // Handle error
    console.error('Error occurred while rendering post:', error);
    res.render('post', { error: 'An error occurred while rendering the post' });
  }
};

// Handle adding a comment to a post
const addComment = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  try {
    // Create new comment
    const comment = new Comment({
      content,
      author: req.session.user._id,
    });

    // Save comment to database
    await comment.save();

    // Find the post and add the comment to its comments array
    const post = await Post.findById(postId);
    post.comments.push(comment);
    await post.save();

    res.redirect(`/post/${postId}`);
  } catch (error) {
    // Handle error
    console.error('Error occurred while adding comment:', error);
    res.redirect(`/post/${postId}`);
  }
};

module.exports = {
  renderPost,
  addComment,
};
