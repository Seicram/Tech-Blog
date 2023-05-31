// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
    // Check if the user is logged in
    if (req.session.user) {
      // User is authenticated, proceed to the next middleware
      next();
    } else {
      // User is not authenticated, redirect to login page
      res.redirect('/login');
    }
  };
  
  module.exports = authMiddleware;
  