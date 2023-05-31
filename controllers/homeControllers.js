// homeControllers.js

const User = require('../models/user');

const renderHomePage = async (req, res) => {
  // Render the homepage view
  res.render('home');
};

const renderSignup = async (req, res) => {
  // Render the signup view
  res.render('signup');
};

const handleSignup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Create a new user
    const user = new User({
      username,
      password,
    });

    // Save the user to the database
    await user.save();

    // Log in the user by storing their user ID in the session
    req.session.user = user._id;

    // Redirect to the homepage after successful signup and login
    res.redirect('/');
  } catch (error) {
    // Handle error
    console.error('Error occurred while signing up:', error);
    res.redirect('/signup');
  }
};

const renderLogin = async (req, res) => {
  // Render the login view
  res.render('login');
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (user && user.password === password) {
      // Log in the user by storing their user ID in the session
      req.session.user = user._id;

      // Redirect to the homepage after successful login
      res.redirect('/');
    } else {
      // Invalid username or password
      res.redirect('/login');
    }
  } catch (error) {
    // Handle error
    console.error('Error occurred while logging in:', error);
    res.redirect('/login');
  }
};

// Other controller functions

module.exports = {
  renderHomePage,
  renderSignup,
  handleSignup,
  renderLogin,
  handleLogin,
  // Other controller functions
};
