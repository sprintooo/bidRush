const express = require('express');
const {authenticateToken} = require('../auth');
const router = express.Router();

const bids = [];

router.get('/', authenticateToken, (req, res) => {
    const userId = req.query.userId;

    if (userId) {
        const userBids = bids.filter(bid => bid.userId === userId);
        return res.json(userBids);
    }

    res.json(bids); // Return all bids if no userId is given
});


router.get('/:id', (req, res) => {
    const bidId = req.params.id;
    res.json({ message: `Fetching bid details for bidId: ${bidId}` });
});

router.post('/', (req, res) => {
    const bid = req.body;

    if (!bid.auctionId || !bid.userId || bid.amount === undefined) {
        return res.status(400).json({ message: "Missing required fields: auctionId, userId, amount" });
    }

    if (bid.amount <= 0) {
        return res.status(400).json({ message: "Bid amount must be greater than 0" });
    }

    bids.push(bid);

    res.json({
        message: "Bid placed successfully!",
        bid: bid  // Returning the same bid data received
    });
});


module.exports = router;
