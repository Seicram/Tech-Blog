// routes.js

const express = require('express');
const {
  renderHomepage,
  renderSignup,
  handleSignup,
  renderLogin,
  handleLogin,
  handleLogout,
} = require('./controllers/homeControllers');

const {
  renderDashboard,
  renderNewPost,
  handleNewPost,
  renderEditPost,
  handleEditPost,
  handleDeletePost,
} = require('./controllers/dashboardControllers');

const {
  renderPost,
  handleAddComment,
} = require('./controllers/postControllers');

const { requireAuth, checkLoggedIn } = require('./middleware/authMiddleware');

const router = express.Router();

// Home routes
router.get('/', checkLoggedIn, renderHomepage);
router.get('/signup', checkLoggedIn, renderSignup);
router.post('/signup', checkLoggedIn, handleSignup);
router.get('/login', checkLoggedIn, renderLogin);
router.post('/login', checkLoggedIn, handleLogin);
router.get('/logout', requireAuth, handleLogout);

// Dashboard routes
router.get('/dashboard', requireAuth, renderDashboard);
router.get('/newpost', requireAuth, renderNewPost);
router.post('/newpost', requireAuth, handleNewPost);
router.get('/editpost/:id', requireAuth, renderEditPost);
router.post('/editpost/:id', requireAuth, handleEditPost);
router.post('/deletepost/:id', requireAuth, handleDeletePost);

// Post routes
router.get('/post/:id', requireAuth, renderPost);
router.post('/addcomment/:id', requireAuth, handleAddComment);

module.exports = router;
