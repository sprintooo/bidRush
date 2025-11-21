const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ status: 'success', message: 'API is healthy' });
});

module.exports = router;
