const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

const handleSignup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
      return res.redirect('/signup');
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.redirect('/signup');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    // Log in the user
    req.login(user, (err) => {
      if (err) {
        console.error('Error occurred while logging in:', err);
        return res.redirect('/signup');
      }

      // Redirect to the dashboard
      res.redirect('/dashboard');
    });
  } catch (error) {
    console.error('Error occurred while signing up:', error);
    res.redirect('/signup');
  }
};

const handleLogin = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
});

const handleLogout = (req, res) => {
  req.logout(); // Clear the session
  res.redirect('/'); // Redirect to the homepage
};

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
};
