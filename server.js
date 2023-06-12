// TODO: Import dependencies (express, path, session, handlebars, controller routes, helpers)
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');


// TODO: Import sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// TODO: Initialize an instance of Express.js and specifiy express PORT
const app = express();
const PORT = process.env.PORT || 3001;

// TODO: Set up Handlebars.js engine with custom helpers for 'hbs'
const hbs = exphbs.create({ helpers });

// TODO: Set up session/cookie secret with Sequelize db connection
const sess = {
    secret: 'super secret',
    cookie: {
      maxAge: 90000000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));
 

// TODO: Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// TODO: Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}! 🚀 `));
  });