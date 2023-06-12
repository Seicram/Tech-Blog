// TODO: Import dependencies
const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models/");
const withAuth = require('../../utils/auth');

// TODO: GET method to display all comments (be sure to include associated Blog Post and User)
router.get("/", (req, res) => {
  Comment.findAll({ include: [User, BlogPost] })
    .then(allComments => {
      res.json(allComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "Error! Unable to display comments!", err });
    });
});

// TODO: POST method to allow user to CREATE a COMMENT (comment added to a single blog post)
router.post("/", withAuth, (req, res) => {
  Comment.create({ ...req.body, user_id: req.session.user_id })
    .then(addComment => {
      res.json(addComment);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;