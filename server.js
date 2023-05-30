const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use('/', require('./controllers/homeController'));
app.use('/auth', require('./controllers/authController'));
app.use('/dashboard', require('./controllers/dashboardController'));
app.use('/post', require('./controllers/postController'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
