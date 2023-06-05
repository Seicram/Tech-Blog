const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const dashboardRoutes = require('./dashboard');
const homeRoutes = require('./home');
const postRoutes = require('./post');

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/post', postRoutes);

module.exports = router;
