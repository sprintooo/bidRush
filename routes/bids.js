const express = require('express');
const router = express.Router();

const bidsService = require('../services/bidsService');

router.get('/', (req, res) => {
    const userId = req.query.userId;
    const bids = bidsService.getBids(userId);
    res.json(bids);
});

router.get('/:id', (req, res) => {
    const bidId = req.params.id;
    const bid = bidsService.getBidById(bidId);

    if (!bid) {
        return res.status(404).json({ message: 'Bid not found' });
    }

    res.json(bid);
});

router.post('/', (req, res) => {
    const { auctionId, userId, amount } = req.body;

    if (!auctionId || !userId || amount === undefined) {
        return res
            .status(400)
            .json({ message: 'Missing required fields: auctionId, userId, amount' });
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        return res
            .status(400)
            .json({ message: 'Bid amount must be a number greater than 0' });
    }

    const bid = bidsService.createBid({ auctionId, userId, amount: parsedAmount });

    res.json({
        message: 'Bid placed successfully!',
        bid,
    });
});

module.exports = router;
