const express = require('express');
const router = express.Router();

router.use('/api', require('./test'));
router.use('/api/bids', require('./bids'));
router.use('/api/auctions', require('./auctions'));

router.use('/api/users', require('./users'));

module.exports = router;
