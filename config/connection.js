const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: 'mysql', // Specify the dialect here (e.g., 'mysql')
      host: process.env.DB_HOST, // Add the host if required
      decimalNumbers: true
    }
  );
}

module.exports = sequelize;
