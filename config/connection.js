const Sequelize = require('sequelize');
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASSWORD, JAWSDB_URL } = process.env;
const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (JAWSDB_URL) {
  sequelize = new Sequelize(JAWSDB_URL);
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: isProduction ? false : console.log, // Disable logging in production
    // You can also customize the logging function for development
  });
}

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
