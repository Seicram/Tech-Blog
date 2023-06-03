// Import modules and controllers
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
router.get('/dashboard', authControllers.authenticate, dashboardControllers.renderDashboard);
router.get('/dashboard/new', authControllers.authenticate, dashboardControllers.renderNewPost);
router.post('/dashboard/new', authControllers.authenticate, dashboardControllers.handleNewPost);
router.get('/dashboard/:id', authControllers.authenticate, dashboardControllers.renderEditPost);
router.post('/dashboard/:id', authControllers.authenticate, dashboardControllers.handleUpdatePost);
router.post('/dashboard/:id/delete', authControllers.authenticate, dashboardControllers.handleDeletePost);

// Post Routes
router.get('/post/:id', postControllers.renderPost);

module.exports = router;
