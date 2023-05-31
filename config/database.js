// database.js

const mongoose = require('mongoose');

// Set up a database connection
mongoose.connect('mongodb://localhost/cms-blog-site', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a User model
const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
