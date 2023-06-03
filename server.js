const express = require('express');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');

// Load environment variables from .env file if available
dotenv.config();

// Import database connection
const { sequelize } = require('./config/connection');

// Import models
require('./models');

// Import routes
const routes = require('./routes');
const authRoutes = require('./routes/auth');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up static directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up sessions
const sess = {
  secret: process.env.SESSION_SECRET || 'secret',
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Passport middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Set up Handlebars as the template engine
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: require('./utils/helpers'),
  })
);
app.set('view engine', 'handlebars');

// Use routes
app.use(routes);
app.use('/auth', authRoutes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
