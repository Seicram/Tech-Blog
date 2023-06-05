const bcrypt = require('bcrypt');
const { User } = require('../models');

const authController = {
  renderSignupPage: (req, res) => {
    res.render('signup');
  },

  handleSignup: async (req, res) => {
    try {
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ email, password: hashedPassword });

      req.session.userId = newUser.id;

      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create a new user' });
    }
  },

  renderLoginPage: (req, res) => {
    res.render('login');
  },

  handleLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }

      req.session.userId = user.id;

      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to log in' });
    }
  },

  handleLogout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to log out' });
        return;
      }
      res.redirect('/');
    });
  },
};

module.exports = authController;
