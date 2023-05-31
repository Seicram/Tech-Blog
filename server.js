const express = require('express');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
const path = require('path');

// Load environment variables from .env file if available
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Load routes
const routes = require('./routes');
const authRoutes = require('./routes/auth');

// Set up static directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Set up Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up Handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Use routes
app.use(routes);
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
