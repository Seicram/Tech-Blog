// TODO: Import dependencies, including express 'router' and routing configuration for API routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/blogPosts', blogPostRoutes);
router.use('/comments', commentRoutes);

// TODO: Export 'router'
module.exports = router;