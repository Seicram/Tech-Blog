const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

const checkSessionExpiration = (req, res, next) => {
  if (req.session.cookie.maxAge <= 0) {
    req.session.destroy();
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = { withAuth, checkSessionExpiration };
