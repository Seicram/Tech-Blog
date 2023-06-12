// Prompt user to SIGN IN, SIGN UP, LOGOUT

// TODO: Import dependencies
const router = require("express").Router();
const { User } = require("../../models/");

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: Create new user (POST method with 'create') --> "sign-up"
// Create a new user based on the data we receive from the signup form on the login page. 
router.post('/signup', async (req, res) => {
  try {
    const addUser = new User();
    addUser.username = req.body.username;
    addUser.email = req.body.email;
    addUser.password = req.body.password;

    const userData = await addUser.save();

    console.log(userData)

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// TODO: User /login route (POST method with 'findOne') --> "sign-in"
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Sorry, incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Sorry, incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: User /logout route (POST method with 'destroy') --> "logout"
router.post('/logout', (req, res) => {
  // DESTROY the user's session when the user logs out
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
