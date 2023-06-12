// HOMEPAGE (displays existing blogposts, does NOT require user to be logged in)

// TODO: Import dependencies
const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all BlogPosts to view on homepage (does NOT require withAuth)
router.get('/', async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    res.render('homepage', {
      blogPosts,
      // Ensures that the 'Logout' option is displayed in the navbar links when user is logged in WHILE ON THIS PAGE (instead of saying 'login' while user is logged in)
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: GET method to get a one blogpost by id --> Option for user to click on a specific existing blog post (so the user can add a comment)
// Be sure to include it's associated User and Comments
router.get('/blogPost/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_body', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        }
      ],
    });

    const blogPost = blogPostData.get({ plain: true });

    res.render('comment', {
      ...blogPost,
      // Ensures that the 'Logout' option is displayed in the navbar links when user is logged in WHILE ON THIS PAGE (instead of saying 'login' while user is logged in)
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: From homepage, user can click on "dashboard" option from the navigation links, which takes them to the page "My Dashboard" (requires withAuth, user must be logged in to access Dashboard link)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: BlogPost
      }],
    });

    const user = userData.get({
      plain: true
    });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // TODO: From Dashboard --> GET method for "+New Post" button that allows user to create/add a new blog post from the main page of the dashboard. Clicking the "+New Post" button will take the user to the "Create New Post" page
router.get('/new', withAuth, (req, res) => {
  console.log(req.session);
  res.render('createPost', {
    // Ensures that the 'Logout' option is displayed in the navbar links when user is logged in WHILE ON THIS PAGE (instead of saying 'login' while user is logged in)
    logged_in: req.session.logged_in,
  });
});

// // TODO: From Dashboard --> GET method for user to click on existing blog post from dashboard page that takes them to an 'Edit Blog Post' page
router.get("/edit/:id", withAuth, (req, res) => {
  BlogPost.findByPk(req.params.id)
    .then(editPostData => {
      if (editPostData) {
        const blogPost = editPostData.get({ plain: true });

        res.render("editPost", {
          blogPost,
          // Ensures that the 'Logout' option is displayed in the navbar links when user is logged in WHILE ON THIS PAGE (instead of saying 'login' while user is logged in)
          logged_in: req.session.logged_in,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// TODO: From homepage, user can click on "login" navlink to login. Once the user fills out all "Login" fields, they are redirected to the "dashboard" page.
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// TODO: From homepage, user can click on "login" navlink, then click 'Sign Up Instead' option. Once the user fills out all "Sign Up" form fields, they are redirected to the "dashboard" page.
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

module.exports = router;