const bcrypt = require('bcrypt');
const { User } = require('./database');

// Function to handle user authentication
const authenticateUser = async (username, password) => {
  // Find the user by username in the database
  const user = await User.findOne({ username });

  if (user) {
    // User found, compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, return the authenticated user
      return user;
    }
  }

  // User not found or password incorrect, return null
  return null;
};

// Function to create a new user
const createUser = async (username, password) => {
  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const user = await User.create({ username, password: hashedPassword });

  // Return the newly created user
  return user;
};

module.exports = {
  authenticateUser,
  createUser,
};
