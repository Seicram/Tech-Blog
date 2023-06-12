// TODO: Import dependencies, including express 'router' and routing configuration for controller routes
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// TODO: Export 'router'
module.exports = router;


