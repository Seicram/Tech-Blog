// routes.js

const express = require('express');
const {
  renderHomePage,
  renderSignup,
  handleSignup,
  renderLogin,
  handleLogin,
  // Other controller functions
} = require('./controllers/homeControllers');

const router = express.Router();

// Homepage route
router.get('/', renderHomePage);

// Signup routes
router.get('/signup', renderSignup);
router.post('/signup', handleSignup);

// Login routes
router.get('/login', renderLogin);
router.post('/login', handleLogin);

// Other routes and their corresponding controller functions

module.exports = router;
