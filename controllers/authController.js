const bcrypt = require('bcrypt');
const { User } = require('../models');
const { authenticateUser, createUser } = require('../auth');

// Handle user login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Authenticate user
    const user = await authenticateUser(username, password);

    if (user) {
      // User authenticated, store user in session
      req.session.user = user;
      res.redirect('/dashboard');
    } else {
      // Invalid credentials, show error message
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle error
    console.error('Error occurred during login:', error);
    res.render('login', { error: 'An error occurred during login' });
  }
};

// Handle user logout
const logout = (req, res) => {
  // Clear user session
  req.session.user = null;
  res.redirect('/');
};

// Handle user registration
const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // Username already taken, show error message
      res.render('signup', { error: 'Username already exists' });
    } else {
      // Create new user
      const user = await createUser(username, password);
      req.session.user = user;
      res.redirect('/dashboard');
    }
  } catch (error) {
    // Handle error
    console.error('Error occurred during signup:', error);
    res.render('signup', { error: 'An error occurred during signup' });
  }
};

module.exports = {
  login,
  logout,
  signup,
};
