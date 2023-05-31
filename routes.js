const express = require('express');
const router = express.Router();
const homeControllers = require('./controllers/homeControllers');
const dashboardControllers = require('./controllers/dashboardControllers');
const postControllers = require('./controllers/postControllers');
const authControllers = require('./controllers/authControllers');

// Home Routes
router.get('/', homeControllers.renderHomePage);

// Authentication Routes
router.get('/signup', authControllers.renderSignupPage);
router.post('/signup', authControllers.handleSignup);
router.get('/login', authControllers.renderLoginPage);
router.post('/login', authControllers.handleLogin);
router.get('/logout', authControllers.handleLogout);

// Dashboard Routes
router.get('/dashboard', dashboardControllers.renderDashboard);
router.get('/dashboard/new', dashboardControllers.renderNewPost);
router.post('/dashboard/new', dashboardControllers.handleNewPost);
router.get('/dashboard/:id', dashboardControllers.renderEditPost);
router.post('/dashboard/:id', dashboardControllers.handleUpdatePost);
router.post('/dashboard/:id/delete', dashboardControllers.handleDeletePost);

// Post Routes
router.get('/post/:id', postControllers.renderPost);

module.exports = router;
