const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./database');
const { checkSessionExpiration } = require('./middlewares');

// Set up Express app
const app = express();
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and session support
app.use(passport.initialize());
app.use(passport.session());

// Set up local strategy for Passport
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Routes
const homeControllers = require('./controllers/homeControllers');
const dashboardControllers = require('./controllers/dashboardControllers');
const postControllers = require('./controllers/postControllers');
const authControllers = require('./controllers/authControllers');

// Home Routes
app.get('/', homeControllers.renderHomePage);

// Authentication Routes
app.get('/signup', authControllers.renderSignup);
app.post('/signup', authControllers.handleSignup);
app.get('/login', authControllers.renderLogin);
app.post('/login', authControllers.handleLogin);
app.get('/logout', authControllers.handleLogout);

// Dashboard Routes
app.get('/dashboard', checkSessionExpiration, dashboardControllers.renderDashboard);
app.get('/dashboard/new', checkSessionExpiration, dashboardControllers.renderNewPost);
app.post('/dashboard/new', checkSessionExpiration, dashboardControllers.handleNewPost);
app.get('/dashboard/:id', checkSessionExpiration, dashboardControllers.renderEditPost);
app.post('/dashboard/:id', checkSessionExpiration, dashboardControllers.handleEditPost);
app.post('/dashboard/:id/delete', checkSessionExpiration, dashboardControllers.handleDeletePost);

// Post Routes
app.get('/post/:id', postControllers.renderPost);
app.post('/post/:id/comment', checkSessionExpiration, postControllers.handleAddComment);

// Set up a database connection
mongoose.connect('mongodb://localhost/cms-blog-site', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => {
  console.error('Error occurred while connecting to the database:', error);
});